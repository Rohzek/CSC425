using System.Net.Mail;
using NotesAPI.Classes.Connections;

namespace NoteAPI.Classes.Email
{
    public class SendEmails
    {
        public SmtpClient client = new SmtpClient();
        public MailAddress from;

        public SendEmails()
        {
            from = new MailAddress(Settings.getEmailAccount(), Settings.getName());

            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(Settings.getEmailAccount(), Settings.getEmailPassword());
        }

        public void SendMessage(MailAddress to, string subject, string body)
        {
            // MM constructor overrides: From, To, Subject, Body
            MailMessage mm = new MailMessage(from, to);
            mm.Subject = subject;
            mm.Body = body;

            client.Send(mm);
        }
    }
}