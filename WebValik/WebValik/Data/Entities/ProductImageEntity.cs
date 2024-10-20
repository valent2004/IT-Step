using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebValik.Data.Entities
{
    [Table("tbl_product_images")]
    public class ProductImageEntity
    {
        [Key]
        public int Id { get; set; } // Ключ картини продуктів
        [Required, StringLength(255)]
        public string Image { get; set; } = string.Empty; // Картини продуктів
        public int Priotity { get; set; } // Пріорітет картини продуктів
        [ForeignKey("Product")]
        public int ProductId { get; set; } // Ключ продукту картини продуктів
        public virtual ProductEntity? Product { get; set; } // Продукт картини продуктів
    }
}
