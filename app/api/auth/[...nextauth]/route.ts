import { handlers } from "../../../../auth" // Adjusted path to point to the correct location of auth.ts
// export const { GET, POST } = handlers

import NextAuth from "next-auth";
import { authOptions } from "../../.././../lib/auth"; // adjust the path if needed

const handler = NextAuth(authOptions);

export const { GET, POST } = handlers
