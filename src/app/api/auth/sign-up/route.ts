import { NextRequest } from "next/server";

import { handleApiResponse } from "src/utils";

import { signUp } from "./service";
import { signUpValidate, SignUpValidateSchema } from "./validate";

export const POST = handleApiResponse(
  async (req: NextRequest, body: SignUpValidateSchema) => {
    return await signUp(body);
  },
  signUpValidate,
);
