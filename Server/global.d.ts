namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    PORT: string;
    QUERY_SEPARATOR: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_SENDER: string;
  }
}