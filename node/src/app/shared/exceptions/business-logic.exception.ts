export class BusinessLogicException extends Error {
  private readonly _errorId?: string;
  private readonly _name: string = 'BusinessLogicException';
  private readonly _message: string;

  constructor(message: string, errorId?: string) {
    super();
    this._message = message;
    if (errorId) {
      this._errorId = errorId;
    }
  }

  public get errorId(): string | undefined {
    return this._errorId;
  }

  public get name(): string {
    return this._name;
  }

  public get message(): string {
    return this._message;
  }

  public plainObject(
    showName?: boolean,
  ): {
    message: string;
    name?: string;
    errorId?: string;
  } {
    const obj = { message: this.message, errorId: this.errorId };
    return showName ? { ...obj, name: this.name } : obj;
  }
}
