import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validation";

export const { handlers, signOut, signIn, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFormData = authSchema.safeParse(credentials);

        if (!validatedFormData.success) {
          return null
        }
        const { email, password } = validatedFormData.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isTryingToAccessApp) {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
