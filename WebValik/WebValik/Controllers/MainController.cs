using Microsoft.AspNetCore.Mvc;
using WebValik.Data;
using WebValik.Models.Category;
using WebValik.Data.Entities;
using WebValik.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace WebValik.Controllers
{
    public class MainController : Controller
    {
        private readonly AppValikDbContext _dbContext; // 
        private readonly IImageWorker _imageWorker;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        private const int PageSize = 10;
        public MainController(AppValikDbContext context, IWebHostEnvironment environment, IImageWorker imageWorker, IMapper mapper)
        {
            _dbContext = context;
            _environment = environment;
            _imageWorker = imageWorker;
            _mapper = mapper;
        }

        // відкривання файлу Index
        public IActionResult Index()
        {
            return View();
        }

        // відкривання файлу Bomba
        public IActionResult Bomba()
        {
            var model = _dbContext.Categories
                .ProjectTo<CategoryItemViewModel>(_mapper.ConfigurationProvider)
                .ToList();
            return View(model);
        }

        // відкривання файлу Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost] //це означає, що ми отримуємо дані із форми від клієнта
        public IActionResult Create(CategoryCreateViewModel model)
        {
            //нова категорія
            var entity = _mapper.Map<CategoryEntity>(model);
            //Збережння в Базу даних інформації
            var dirName = "uploading";
            var dirSave = Path.Combine(_environment.WebRootPath, dirName); // шукати назву
            // Перенесення фото на uploading, якщо нема - створюємо папку
            if (!Directory.Exists(dirSave))
            {
                Directory.CreateDirectory(dirSave);
            }
            // ППеревірка відсутності фото, і створення елементів
            if (model.Photo != null)
            {
                entity.Image = _imageWorker.Save(model.Photo);
            }
            //entity.Name = model.Name;
            //entity.Description = model.Description;
            // Добавлення нової категорії
            _dbContext.Categories.Add(entity);
            _dbContext.SaveChanges();
            //Переходимо до списку усіх категорій, тобто визиваємо метод Bomba нашого контролера
            return Redirect("/");
        }

        [HttpPost] // видаляє елемент по ключу
        public IActionResult Delete(int id)
        {
            var category = _dbContext.Categories.Find(id); // шукає ключ
            // перевірка, чи існує та категорія з цим ключем
            if (category == null)
            {
                return NotFound();
            }
            // перевірка, чи існує тут фото
            if (!string.IsNullOrEmpty(category.Image))
            {
                _imageWorker.Delete(category.Image);
            }
            _dbContext.Categories.Remove(category); // Видалення конкретної категорії
            _dbContext.SaveChanges();

            return Json(new { text = "Ми його видалили" }); // Вертаю об'єкт у відповідь
        }

        // Пошук елементів
        public IActionResult Search(string name, decimal? minPrice, decimal? maxPrice, int page = 1)
        {
            var products = _dbContext.Products.AsQueryable(); // виведення всіх продуктів

            // Застосовуйте фільтри на основі введених користувачем даних
            if (!string.IsNullOrEmpty(name))
            {
                products = products.Where(p => p.Name.Contains(name));
            }

            if (minPrice.HasValue)
            {
                products = products.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                products = products.Where(p => p.Price <= maxPrice.Value);
            }

            // Логіка розбиття на сторінки
            var totalItems = products.Count();
            var totalPages = (int)Math.Ceiling((double)totalItems / PageSize);
            var productsList = products
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .ToList();

            // Передайте дані про продукти та розбивку на сторінки в подання
            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = totalPages;

            return View(productsList); // відкрити сайт з елементами
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _dbContext.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            var model = new CategoryEditViewModel
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                ExistingImage = category.Image
            };

            return View(model);
        }

        [HttpPost]
        public IActionResult Edit(CategoryEditViewModel model)
        {
            var entity = _dbContext.Categories.Find(model.Id);
            if (entity == null)
            {
                return NotFound();
            }

            entity.Name = model.Name;
            entity.Description = model.Description;

            // Якщо нове фото завантажене, видаляємо старе і зберігаємо нове
            if (model.Photo != null)
            {
                // Видалення старого фото
                if (!string.IsNullOrEmpty(entity.Image))
                {
                    _imageWorker.Delete(entity.Image);
                }

                // Зберігаємо нове фото
                entity.Image = _imageWorker.Save(model.Photo);
            }

            _dbContext.SaveChanges();
            return RedirectToAction("Bomba");
        }
    }
}
