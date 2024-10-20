using Bogus;
using Microsoft.EntityFrameworkCore;
using WebValik.Data;
using WebValik.Data.Entities;
using WebValik.Interfaces;
using WebValik.Mapper;
using WebValik.Services;

// Забезпечує зручний API для конфігурування та налаштування вебзастосунку
var builder = WebApplication.CreateBuilder(args);

// Додаємо різні сервіси до контейнера сервісів
builder.Services.AddDbContext<AppValikDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("MyConnectionDB")));

builder.Services.AddScoped<IImageWorker, ImageWorker>();

// Додайте послуги в контейнер
builder.Services.AddControllersWithViews();

builder.Services.AddAutoMapper(typeof(AppMapperProfile));

// Створюємо екземпляр вебзастосунку
var app = builder.Build();

// Налаштовуємо middleware та pipeline обробки запитів
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Вказуємо маршрути для контролерів
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Products}/{action=Index}/{id?}");

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetService<AppValikDbContext>();
    var imageWorker = serviceScope.ServiceProvider.GetService<IImageWorker>();

    // Застосувати міграції, якщо вони не застосовані
    context.Database.Migrate(); // Автоматичний запуск міграцій на БД, якщо їх там немає

    if (!context.Categories.Any())
    {
        var imageName = imageWorker.Save("https://rivnepost.rv.ua/img/650/korisnoi-kovbasi-ne-buvae-hastroenterolohi-nazvali_20240612_4163.jpg");
        var kovbasa = new CategoryEntity
        {
            Name = "Ковбаси",
            Image = imageName,
            Description = "Тим часом відмовлятися від ковбаси повністю не обов’язково. " +
            "Важливо пам’ятати, що це делікатес, який можна вживати не більше 50 грамів на день."
        };

        imageName = imageWorker.Save("https://www.vsesmak.com.ua/sites/default/files/styles/large/public/field/image/syrnaya_gora_5330_1900_21.jpg?itok=RPUrRskl");
        var cheese = new CategoryEntity
        {
            Name = "Сири",
            Image = imageName,
            Description = "Cир – один з найчастіших гостей на нашому столі. " +
            "Адже це і смачно, і корисно, і доступно. Не можна сказати, що увесь, " +
            "що продається на прилавках супермаркетів твердий сир – неякісний."
        };

        imageName = imageWorker.Save("https://www.foodandwine.com/thmb/C8XvnSkIMvz2XewXFDB_JYK-mSU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Perfect-Sandwich-Bread-FT-RECIPE0723-dace53e15a304942acbc880b0ae34f5a.jpg");
        var bread = new CategoryEntity
        {
            Name = "Хліб",
            Image = imageName,
            Description = "У сегменті ринку «здорового харчування» існують сорти хліба, " +
            "які майже не сприяють набору зайвої ваги – наприклад, цільнозерновий хліб."
        };
        context.Categories.Add(kovbasa);
        context.Categories.Add(cheese);
        context.Categories.Add(bread);
        context.SaveChanges();
    }
    if (!context.Products.Any())
    {
        var categories = context.Categories.ToList();

        var fakerProduct = new Faker<ProductEntity>("uk")
                    .RuleFor(u => u.Name, (f, u) => f.Commerce.Product())
                    .RuleFor(u => u.Price, (f, u) => decimal.Parse(f.Commerce.Price()))
                    .RuleFor(u => u.Category, (f, u) => f.PickRandom(categories));

        string url = "https://picsum.photos/1200/800?product";

        var products = fakerProduct.GenerateLazy(30);

        Random r = new Random();

        foreach (var product in products)
        {
            context.Add(product);
            context.SaveChanges();
            int imageCount = r.Next(3, 5);
            for (int i = 0; i < imageCount; i++)
            {
                var imageName = imageWorker.Save(url);
                var imageProduct = new ProductImageEntity
                {
                    Product = product,
                    Image = imageName,
                    Priotity = i
                };
                context.Add(imageProduct);
                context.SaveChanges();
            }
        }
    }
}

// Запускаємо застосунок
app.Run();