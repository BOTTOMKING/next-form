import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // or number, depending on your implementation
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
