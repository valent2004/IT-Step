using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WebValik.Models.Category;

public class CategoryEditViewModel
{
    public int Id { get; set; }

    [Required, StringLength(255)]
    public string Name { get; set; }

    [StringLength(4000)]
    public string? Description { get; set; }

    // Файл нового зображення
    public IFormFile? Photo { get; set; }

    // Існуюче зображення, якщо нове не завантажене
    public string? ExistingImage { get; set; }
}
