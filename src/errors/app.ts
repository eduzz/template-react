export default class AppError<T = any> extends Error {
  public readonly ignoreLog: boolean;
  protected readonly extraData: T | null;

  constructor(message: string, extraData?: T, ignoreLog = true) {
    super(message);
    this.extraData = extraData || null;
    this.ignoreLog = ignoreLog;
  }
}
