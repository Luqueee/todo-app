import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // pages: {
  //   signIn: "/profile/signin",
  // },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});

// callbacks: {
//   async signIn({ account, profile }) {
//     if (account && account.provider === "google") {
//       return !!(
//         profile?.email_verified && profile?.email?.endsWith("@example.com")
//       );
//     }
//     return true; // Do different verification for other providers that don't have `email_verified`
//   },
// },
