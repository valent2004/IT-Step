namespace WebValik.Models.Category;

public class CategoryCreateViewModel
{
    public string Name { get; set; } = String.Empty; // Для назви
    public IFormFile? Photo { get; set; } //Тип для передачі файлі на сервер - із сторінки хочу отримати файл із <input type="file"/>
    public string Description { get; set; } = string.Empty; // Для опису
}
