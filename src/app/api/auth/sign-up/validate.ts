import z from "zod";

export const signUpValidate = z
  .object({
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

    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string",
      })
      .min(1, { message: "Confirm password cannot be empty" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["password", "confirmPassword"],
    message: "Password do not match",
  });

export type SignUpValidateSchema = z.infer<typeof signUpValidate>;
