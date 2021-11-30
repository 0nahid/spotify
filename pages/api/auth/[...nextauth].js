import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "../../../lib/spotify"

export default NextAuth({
    // configure one or more providers here
    providers: [
        Providers.Spotify({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // initial the user's session
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, // were handling expiry time in milliseconds hence the *1000
                }
            }

            // return the previous token if the token is still valid
            if (Date.now() < token.accessTokenExpires) {
                console.log("token still valid");
                return token
            }
            // refresh the user's session

        }
    }
})