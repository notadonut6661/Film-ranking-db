import * as fs from 'fs';

export class Logger<LogPurpose> {
  private LogFormat: Map<LogPurpose, string>;

  constructor(_logFormat: Map<LogPurpose, string>) {
    this.LogFormat = _logFormat;
  }

  private PrintToFile(m_Format: string, m_Path: string, m_Data: unknown): void | never {
    
  }

  public CreateLogDecorator(m_Purpose: LogPurpose) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    }
  }
}
