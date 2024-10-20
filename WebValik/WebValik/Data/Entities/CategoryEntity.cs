using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebValik.Data.Entities
{
    [Table("tbl_categories")]
    public class CategoryEntity
    {
        [Key]
        public int Id { get; set; } // Ключ категорії
        [Required, StringLength(255)]
        public string Name { get; set; } = string.Empty; // Ім'я категорії
        [StringLength(500)]
        public string? Image { get; set; } // Фото категорії
        [StringLength(4000)]
        public string? Description { get; set; } // Опис категорії
        public virtual ICollection<ProductEntity>? Products { get; set; } // Колекція продуктів
    }
}
