import { Request } from 'express';

export type Option<T> = T | undefined;
export type ExpressReq = Request & {
  user?: {
    id: number;
    username: string;
    displayName: string;
    role: string;
    profilePicture: string;
    posts: any[];
    threads: any[];
  };
};
