import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";
import {user,session,account,verification} from "./db/auth-schema";


export const auth = betterAuth({
    
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
  },
  }),
  
  emailAndPassword: { 
    enabled: true, 
  }, 
  
});