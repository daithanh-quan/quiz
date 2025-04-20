import z from "zod";

export const signInValidate = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format")
    .min(1, { message: "Email cannot be empty" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password cannot be empty" }),
});

export type SignInValidateSchema = z.infer<typeof signInValidate>;
