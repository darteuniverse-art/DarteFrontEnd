import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabaseAdmin } from "./supabaseAdmin";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log("NextAuth signIn triggered");
      console.log("User object:", user);
      console.log("Account object:", account);

      if (account?.provider === "google") {
        console.log("Inserting/updating user in Supabase...");

        const { data, error } = await supabaseAdmin
          .from("users")
          .upsert(
            {
              id: user.id,       // NextAuth user ID
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
            },
            { onConflict: "email" }
          );

        console.log("Supabase upsert result:", { data, error });

        if (error) {
          console.error("Supabase insert error:", error);
          return false; // stop sign-in if error occurs
        }
      }

      return true;
    },
  },
};

export default authOptions;
