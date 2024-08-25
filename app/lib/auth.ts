import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Add other providers as needed

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],
  // Optional: add a custom pages or callbacks if needed
};

export default NextAuth(authOptions);
