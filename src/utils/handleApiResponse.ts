import { NextRequest } from "next/server";

import { z, ZodSchema } from "zod";

type ApiResponse<T> = {
  data: T;
  message?: string;
  status?: number;
};

export function handleApiResponse<ReqType extends ZodSchema<unknown>, ResType>(
  handler?: (
    req: NextRequest,
    params?: z.infer<ReqType>,
  ) => Promise<ApiResponse<ResType>>,
  schema?: ReqType,
) {
  return async (req: NextRequest): Promise<Response> => {
    try {
      const json = await req.json();

      const parsedBody = schema.parse(json);

      const { data, message, status } = await handler(req, parsedBody);

      return Response.json(
        {
          status: status ?? 200,
          message: message ?? "Successfully!",
          data: data ?? null,
        },
        { status: status ?? 200 },
      );
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.message ||
        error?.message ||
        "An unexpected error occurred!";
      return Response.json({ message, status: 400 }, { status: 400 });
    }
  };
}
