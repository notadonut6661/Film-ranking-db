export class Logger<LogPurpose> {
  private LogFormat: Map<LogPurpose, string>;

  constructor(_logFormat: Map<LogPurpose, string>) {
    this.LogFormat = _logFormat;
  }

  private PrintToFile(format: LogPurpose) { }

  public CreateLogDecorator(m_Purpose: LogPurpose) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    }
  }
}
