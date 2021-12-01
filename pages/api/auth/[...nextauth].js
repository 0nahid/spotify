import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('refresh token is: ', refreshedToken);
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires = Date.now() + refreshedToken.expires_in * 1000 // 1 hour as 3600 returns from spotify api
            refreshedToken: refreshedToken.refresh_token ?? token.refreshToken,
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