export const secret = 'sdNEt9236pKXjvkxKz8ve3qj3qtgzLEGPYHNwKdALdxDjyqZ2JK2kkqNhfRsMBF5H4pPyJdkLsuggmX5znNGa7zCqbWRxmkt9VkVRvYG4pLyTxP96y3UvW3pqhPNcvCwj3AqLBaXxwTgDfw5SgNnSkHcgHyDhBZfMQhz4WjfztwYSSry4TJAFhEM9VZ7Q7ZHbbewBW62wDZebWCphYNZepfqwUSGe2qFsEZbaBWr3w97MHvgph5Kq92Umy5HNDTK';

export enum MailType {api = 0, mock, both, none}
export const mailConfig: number = MailType.mock;

export const PORT: number = 9080;
export const TESTPORT: number = 9980;
export const emailAPIaddr: string = 'http://localhost:7080';
export const frontendURL: string = 'http://localhost:4200';
export const serverURL: string = 'http://localhost:' + PORT;
export const databaseURL: string = 'http://localhost:8000/';
