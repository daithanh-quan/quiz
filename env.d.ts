declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_PASSWORD: string;
    JWT_SECRET_KEY: string;
    JWT_ALGORITHM: string;
    JWT_EXPIRED_TIME: string;
  }
}
