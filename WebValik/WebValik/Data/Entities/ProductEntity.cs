using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebValik.Data.Entities
{
    [Table("tbl_products")]
    public class ProductEntity
    {
        [Key]
        public int Id { get; set; } // Ключ продуктів
        [Required, StringLength(255)]
        public string Name { get; set; } = String.Empty; // Ім'я продуктів
        public decimal Price { get; set; } // Ціна продуктів
        [ForeignKey("Category")]
        public int CategoryId { get; set; } // Ключ категорії продуктів
        public CategoryEntity? Category { get; set; } // Існуюча категорія продуктів
        public virtual ICollection<ProductImageEntity>? ProductImages { get; set; } // Колекція картин продуктів
    }
}
