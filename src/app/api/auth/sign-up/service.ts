import createHttpError from "http-errors";

import { prismaInstance, PrismaTransaction } from "src/databases";

import { SignUpValidateSchema } from "./validate";

export const signUp = async (params: SignUpValidateSchema) => {
  return await prismaInstance.$transaction(
    async (transaction: PrismaTransaction) => {
      const foundExistingUser = await transaction.userModel.findUnique({
        where: { email: params.email, deletedAt: null },
      });

      if (foundExistingUser) {
        throw createHttpError.BadRequest(
          "Email already exist. Please use another email to complete your sign up",
        );
      }

      await transaction.userModel.create({
        data: { email: params.email, password: params.password },
      });

      return { data: null, message: "Successfully signed up" };
    },
  );
};
