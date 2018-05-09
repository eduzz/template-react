export class ServiceError<T = any> extends Error {
  public readonly ignoreLog: boolean;
  public readonly metadata: T;

  constructor(message: string, metadata?: T, ignoreLog: boolean = true) {
    super(message);
    this.metadata = metadata || null;
    this.ignoreLog = ignoreLog;
  }
}