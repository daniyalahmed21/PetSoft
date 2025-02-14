import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";


export const {signIn, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
        async authorize (credentials) {
            const {email,password}= credentials

            const user = await prisma.user.findUnique(
                {where: {email}}
            )

            if (!user ) {
                return null
            }

            const passwordMatch = await bcrypt.compare(password, user.hashedPassword)

            if (!passwordMatch){
                return null
            }   

            return user
        }
    })
  ],
  callbacks: {
    authorized: ({auth,request}) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")
      if (isTryingToAccessApp){
        return false
      }
      else{
        return true
      }
    },
  }
});
