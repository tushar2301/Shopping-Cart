using System.ComponentModel.DataAnnotations;

namespace ShoppingCart.Models
{
    public class UserCart
    {
        [Key]
        public int CartId { get; set; }
        // public string UserID { get; set; }
        public string UserID { get; set; }

        public string prName { get; set; }

        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public string ProductImage { get; set; }
    }
}
