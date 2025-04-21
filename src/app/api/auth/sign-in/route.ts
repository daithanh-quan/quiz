import { NextRequest } from "next/server";

import { handleApiResponse } from "src/utils";

import { signIn } from "./service";
import { signInValidate, SignInValidateSchema } from "./validate";

export const POST = handleApiResponse(
  async (req: NextRequest, body: SignInValidateSchema) => {
    return await signIn(body);
  },
  signInValidate,
);
