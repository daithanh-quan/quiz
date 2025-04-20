import { PrismaClient } from "@prisma/client";
import {
  enhance,
  PrismaClient as ZenstackPrismaClient,
} from "@zenstackhq/runtime";

export type PrismaTransaction = Parameters<
  ZenstackPrismaClient["$transaction"]
>[0] extends (client: infer T) => unknown
  ? T
  : never;

export const prismaRawInstance = new PrismaClient();

export const prismaInstance = enhance(prismaRawInstance);
