import * as fs from 'fs';
import { $enum } from "ts-enum-util";

enum LogConfigOptions {
  date="date",
  status="status",
}

const LogConfigOptionsList = $enum(LogConfigOptions).getKeys() as string[];

export class Logger<LogPurpose> {
  private LogFormat: Map<LogPurpose, string>;

  constructor (_logFormat: Map<LogPurpose, string>) {
    this.LogFormat = _logFormat;
  }

  private EncodeLogFormatString (LogFormat: string): Array<LogConfigOptions> {
    const result: Array<LogConfigOptions> = [];

    for (let i = 0; i < LogFormat.split(' ').length; i++) {
      const currentOption = LogFormat.split(' ')[i];
      
      if (!LogConfigOptionsList.includes(currentOption)) continue;

      result.push(currentOption as LogConfigOptions);
    }

    return result ;
  }

  private PrintToFileByFormat (m_Format: string, m_Path: string, m_Data: Map<LogConfigOptions, string>): void | never {
   console.log(m_Format); 
  }

  public CreateLogDecorator (m_Purpose: LogPurpose) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    }
  }
}
