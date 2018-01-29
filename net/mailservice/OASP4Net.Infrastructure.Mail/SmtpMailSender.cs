using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace OASP4Net.Infrastructure.Mail
{
    public class SmtpMailSender
    {
        private SmtpOptions SmtpClientOptions { get; set; }
        private string From { get; set; }
        private List<string> To { get; set; }
        private List<string> ToCc { get; set; }
        private string Subject { get; set; }
        private string Body { get; set; }
        private bool IsHtml { get; set; }
        private List<string> AttachmentFiles { get; set; }

        public SmtpMailSender(SmtpOptions smtpOptions, string from, IEnumerable<string> to, IEnumerable<string> toCc,
            string subject, string body, IEnumerable<string> attachmentFiles, bool isHtml = false)
        {
            SmtpClientOptions = smtpOptions;
            From = from;
            To = to.ToList();
            ToCc = toCc.ToList();
            Subject = subject;
            Body = body;
            IsHtml = isHtml;
            AttachmentFiles = attachmentFiles.ToList();
        }

        private string CheckIntegrity()
        {
            var message = new StringBuilder();

            if (string.IsNullOrEmpty(From)) message.AppendLine("No sender email address found.");
            if (!To.Any()) message.AppendLine("No destination email address found.");
            if (string.IsNullOrEmpty(Subject)) message.AppendLine("No subject found.");
            if (string.IsNullOrEmpty(Body)) message.AppendLine("No email body found.");
            message.Append(CheckAttachments());
            return message.ToString();
        }

        public async Task<bool> SendAsync()
        {
            try
            {
                var checkMessage = CheckIntegrity();
                if (!string.IsNullOrEmpty(checkMessage)) throw new ArgumentException(checkMessage);

                var message = new MimeMessage {Subject = Subject};
                message.From.Add(new MailboxAddress(From));
                AddDestinationAddress(ref message, To);
                AddDestinationAddress(ref message, ToCc, true);
                AddBodyMessageAndAttachments(ref message);
                var smtpClient = await ConfigureSmtp();

                await smtpClient.SendAsync(message).ConfigureAwait(false);
                await smtpClient.DisconnectAsync(true).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message} : {ex.InnerException}");
                throw new Exception($"{ex.Message} : {ex.InnerException}");
            }

            return true;

        }

        private void AddDestinationAddress(ref MimeMessage mimeMessage, IEnumerable<string> destinationEmailList,
            bool isCc = false)
        {
            if (isCc)
            {
                foreach (var  destinationUser in destinationEmailList)
                {
                    mimeMessage.Cc.Add(new MailboxAddress( destinationUser.Trim()));
                }
            }
            else
            {
                foreach (var destinationUser in destinationEmailList)
                {
                    mimeMessage.To.Add(new MailboxAddress(destinationUser.Trim()));
                }
            }
        }

        private void AddBodyMessageAndAttachments(ref MimeMessage mimeMessage)
        {
            var bodyBuilder = new BodyBuilder();

            if (IsHtml) bodyBuilder.HtmlBody = Body;
            else bodyBuilder.TextBody = Body;

            foreach (var attachment in AttachmentFiles)
            {
                if (File.Exists(attachment)) bodyBuilder.Attachments.Add(attachment);
            }
            
            mimeMessage.Body = bodyBuilder.ToMessageBody();
        }


        private async Task<SmtpClient> ConfigureSmtp()
        {
            var smtpClient = new SmtpClient();


            await smtpClient.ConnectAsync(SmtpClientOptions.Server, SmtpClientOptions.Port, SmtpClientOptions.UseSsl)
                .ConfigureAwait(false);
            smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");

            if (SmtpClientOptions.RequiresAuthentication)
            {
                await smtpClient.AuthenticateAsync(SmtpClientOptions.User, SmtpClientOptions.Password)
                    .ConfigureAwait(false);
            }

            return smtpClient;
        }

        private string CheckAttachments()
        {
            var message = new StringBuilder();

            foreach (var attachment in AttachmentFiles)
            {
                if (!File.Exists(attachment)) message.AppendLine($"The attached file '{attachment}' does not exists.");
            }

            return message.ToString();
        }
    }
}
