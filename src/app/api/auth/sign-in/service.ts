import bcrypt from "bcryptjs";
import createHttpError from "http-errors";

import { prismaRawInstance } from "src/databases";
import { signJwt } from "src/utils";

import { SignInValidateSchema } from "./validate";

export const signIn = async (
  params: SignInValidateSchema,
): Promise<{ data: { accessToken: string } }> => {
  const foundUser = await prismaRawInstance.userModel.findUnique({
    where: { email: params.email },
  });

  if (!foundUser) {
    throw new createHttpError.NotFound("Account does not exist");
  }

  const isMatchedPassword = await bcrypt.compare(
    params.password,
    foundUser.password,
  );

  if (!isMatchedPassword) {
    throw new createHttpError.BadRequest("Password is incorrect");
  }

  const accessToken = await signJwt({
    id: foundUser.id,
    email: foundUser.email,
  });

  return { data: { accessToken } };
};
