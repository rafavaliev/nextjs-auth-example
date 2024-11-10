import NextAuth, {} from "next-auth"
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import {db, accounts, sessions, users, verificationTokens} from "@/db/schema"
import Google from "next-auth/providers/google"
import Yandex from "@auth/core/providers/yandex";
import Mailru from "@auth/core/providers/mailru";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        Google,
        Mailru({
            clientId: process.env.MAILRU_CLIENT_ID!,
            clientSecret: process.env.MAILRU_CLIENT_SECRET!,
            checks: ['state'],
            profile(profile) {
                return {
                    id: profile.email,
                    name: profile.name,
                    firstName: profile.first_name || profile.name,
                    lastName: profile.last_name,
                    email: profile.email,
                    image: profile.picture || profile.image,
                }
            },
            userinfo: {
                url: "https://oauth.mail.ru/userinfo",
                async request({tokens, client}) {
                    const url = new URL("https://oauth.mail.ru/userinfo")
                    url.searchParams.append("access_token", tokens.access_token!)

                    const response = await fetch(url.toString())
                    const profile = await response.json()

                    return profile
                }
            }
        }),
        Yandex
    ],
    debug: true,
})