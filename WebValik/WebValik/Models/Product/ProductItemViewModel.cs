namespace WebValik.Models.Product
{
    public class ProductItemViewModel
    {
        public int Id { get; set; } // Ключ продуктів
        public string Name { get; set; } = String.Empty; // Ім'я продуктів
        public decimal Price { get; set; } // Ціна продуктів
        public string CategoryName { get; set; } = String.Empty; // Ключ категорії продуктів
        public List<string>? Images { get; set; }
    }
}
