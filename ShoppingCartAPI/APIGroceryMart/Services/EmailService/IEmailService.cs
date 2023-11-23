using ShoppingCart.Data;

namespace ShoppingCart.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(Email request);
    }
}
