export class MailerServiceMock {
  sendPlainMail = jest.fn(() => ({ catch: jest.fn() }));
  sendTemplateMail = jest.fn(() => ({ catch: jest.fn() }));
  addTemplate = jest.fn();
  registerPartial = jest.fn();
  registerHelper = jest.fn();
}
