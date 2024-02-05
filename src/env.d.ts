declare module 'Express' {
  interface Request {
    user?: {
      id: number;
      username: string;
      displayName: string;
      role: string;
      profilePicture: string;
      posts: any[];
      threads: any[];
    };
  }
}

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
