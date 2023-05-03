import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import getConfig from 'next/config'

const { publicRuntimeConfig: { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } } = getConfig()

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        }
      }

    }),
  ],
  secret: process.env.JWT_SECRET
});