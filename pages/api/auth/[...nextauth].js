import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL, spotifyApi } from './../../../lib/spotify';

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("refreshToken is ", refreshedToken);
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_at * 1000, // we aew handling expiry from spotify api
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
            // refresh if new one came back else fall back to refresh token
        }
    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
    // configure one or more providers here
    providers: [
        SpotifyProvider({
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
            console.log("token expired, refreshing");
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    }
})