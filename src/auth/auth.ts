import { dbConnection } from "#/dal/db/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(dbConnection(), {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    plugins: [
        /*twoFactor(), passkey(), organization()*/
    ],
});
