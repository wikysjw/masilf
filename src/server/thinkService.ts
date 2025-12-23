import { Prisma, Think } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ThinkCreate, ThinkUpdate } from "@/lib/types/think";

export const thinkService = {
  async list(): Promise<Think[]> {
    return prisma.think.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  async get(id: string): Promise<Think | null> {
    return prisma.think.findUnique({ where: { id } });
  },
  async create(input: ThinkCreate): Promise<Think> {
    return prisma.think.create({
      data: {
        author: input.author,
        content: input.content,
        emotion: input.emotion ?? [],
        hashtags: input.hashtags ?? [],
        agree: input.agree ?? {},
      },
    });
  },
  async update(id: string, input: ThinkUpdate): Promise<Think | null> {
    try {
      return await prisma.think.update({
        where: { id },
        data: {
          author: input.author,
          content: input.content,
          emotion: input.emotion,
          hashtags: input.hashtags,
          agree: input.agree,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },
  async remove(id: string): Promise<boolean> {
    try {
      await prisma.think.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return false;
      }
      throw error;
    }
  },
};
