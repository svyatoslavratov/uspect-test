export interface IConfig {
  port: number;
  dbUrl: string;
  sessionSecret: string;
  jwtSecret: string;
  email: {
    user: string;
    pass: string;
    host: string;
    send: boolean;
  };
  agenda: {
    dbCollection: string;
    pooltime: string;
  };
}
