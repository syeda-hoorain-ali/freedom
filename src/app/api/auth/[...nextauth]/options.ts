import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        email: credentials?.email
                    })

                    if (!user) {
                        throw new Error("Invalid email");
                    }

                    const isPasswordCorrect = await bcrypt.compare((credentials?.password || ''), user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid Password");
                    }

                    return user;
                } catch (error) {
                    console.log("error", error)
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.cart = user.cart;
            }
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isAdmin = token.isAdmin;
                session.user.cart = token.cart;
            }
            return session;
        }

    },
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
        error: '/error'
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
}

