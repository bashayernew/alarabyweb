import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        if (!user.isActive) return null;
        const ok = await compare(
          String(credentials.password),
          user.passwordHash
        );
        if (!ok) return null;
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
        const role = user.role === "admin" ? "super_admin" : user.role;
        await createActivityLog({
          user: { id: user.id, email: user.email, name: user.name, role },
          action: "sign_in",
          module: "auth",
          itemLabel: user.email,
        });
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          image: null,
          role,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.role = (user as { role?: string }).role ?? "viewer";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = (token.role as string) ?? "viewer";
      }
      return session;
    },
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}
