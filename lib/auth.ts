import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import db from '@/lib/db';
// import bcrypt from 'bcrypt'; // En un entorno real, usaríamos bcrypt

// Simulación de hash para este demo
const saltAndHashPassword = (password: string) => {
    return password; // NO HACER ESTO EN PRODUCCIÓN
};

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await db.user.findUnique({ where: { email } });

                        if (!user) return null;

                        // En producción: const passwordsMatch = await bcrypt.compare(password, user.password);
                        const passwordsMatch = password === user.password;

                        if (passwordsMatch) return user;
                    }

                    console.log('Invalid credentials');
                    return null;
                } catch (error) {
                    console.error('Auth Error:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    }
});
