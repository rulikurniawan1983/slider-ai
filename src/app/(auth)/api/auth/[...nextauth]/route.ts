import NextAuth from "next-auth";
import { auth as authConfig } from "@/lib/auth/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
