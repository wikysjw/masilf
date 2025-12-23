import { Prisma } from "@prisma/client";

export type Think = {
  id: string;
  author: string;
  content: string;
  emotion: string[];
  hashtags: string[];
  agree: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ThinkCreate = {
  author: string;
  content: string;
  emotion?: string[];
  hashtags?: string[];
  agree?: number;
};

export type ThinkUpdate = {
  author?: string;
  content?: string;
  emotion?: string[];
  hashtags?: string[];
  agree?: number;
};
