import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

import { prismaInstance, PrismaTransaction } from "src/databases";
import { signJwt } from "src/utils";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ profile, user }) => {
      try {
        const foundUser = await prismaInstance.$transaction(
          async (transaction: PrismaTransaction) => {
            let foundUser = await transaction.userModel.findUnique({
              where: { email: profile.email, deletedAt: null },
            });

            if (!foundUser) {
              const [firstName, lastName] = profile.name.split(" ");
              foundUser = await transaction.userModel.create({
                data: {
                  email: profile.email,
                  firstName,
                  lastName,
                },
              });
            }

            return foundUser;
          },
        );

        const token = await signJwt({
          id: foundUser.id,
          email: foundUser.email,
        });

        user["accessToken"] = token;

        const cookie = await cookies();
        cookie.set("token", token);

        return true;
      } catch (error) {
        console.log("Error:", error);
        return false;
      }
    },
    jwt: async ({ token, user }) => {
      if (user && user["accessToken"]) {
        token["accessToken"] = user["accessToken"];
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token["accessToken"]) {
        session["accessToken"] = token["accessToken"];
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
