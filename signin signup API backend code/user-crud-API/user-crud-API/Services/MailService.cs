using System.Net;
using System.Net.Http;
using System.Net.Mail;

namespace user_crud_API.Services
{
    public interface IMailService
    {
        public bool SendMail(string email, string subject,string message);
    }
    public class MailService : IMailService
    {
        private string fromMail,fromPassword;
        public MailService(IConfiguration c)
        {
            fromMail = c.GetConnectionString("fromMail") ?? "";
            fromPassword = c.GetConnectionString("fromPassword") ?? "";
        }

        public bool SendMail(string email, string subject = "", string message = "")
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(fromMail);
            mailMessage.Subject = subject;
            mailMessage.To.Add(new MailAddress(email));
            mailMessage.Body = "<html><body>" + message + "</body></html>";
            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail,fromPassword),
                EnableSsl = true
            };

            try
            {
                smtpClient.Send(mailMessage);
                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine("--------------------------------------------");
                Console.WriteLine(e.Message);
                Console.WriteLine("--------------------------------------------");
                return false;
            }
        }
    }
}
