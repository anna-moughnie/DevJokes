import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/auth/auth";

export async function requireServerSession() {
  const headers = getRequestHeaders();

  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error("unauthorized");
  }

  return session;
}
