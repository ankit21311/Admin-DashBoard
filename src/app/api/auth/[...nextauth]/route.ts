import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                // Simple demo credentials - in production, validate against database
                if (credentials?.email === 'admin@example.com' && credentials?.password === 'admin123') {
                    return {
                        id: '1',
                        email: 'admin@example.com',
                        name: 'Admin User',
                        role: 'admin',
                    };
                }
                if (credentials?.email === 'user@example.com' && credentials?.password === 'user123') {
                    return {
                        id: '2',
                        email: 'user@example.com',
                        name: 'Regular User',
                        role: 'user',
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = (user as any).role || 'user';
            }
            return token;
        },
        async session({session, token}) {
            if (session?.user) {
                (session.user as any).id = token.sub;
                (session.user as any).role = token.role || 'user';
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};