using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShoppingCart.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }
        //[Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        [RegularExpression("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", ErrorMessage = "Invalid Id.")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Id is Required")]
        public string Email { get; set; }
        //[Index(IsUnique = true)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Email is Required")]
        public string AdminName { get; set; }
        [StringLength(50, MinimumLength = 8)]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Name is Required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}