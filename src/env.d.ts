declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      /**
       * @deprecated This is used for and only for prisma
       */
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};
