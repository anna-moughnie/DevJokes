import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { CreateUserInput } from "#/types";
import { auth } from "#/auth/auth";

export const createUser = createServerFn({ method: "POST" })
  .inputValidator((input: CreateUserInput) => input)
  .handler(async ({ data }) => {
    console.log(data);
    try {
      return await auth.api.signUpEmail({
        body: {
          name: data.fullname,
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const signInUser = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    console.log("Signing in");
    console.log(data);
    return await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  });

export const signOutUser = createServerFn({ method: "POST" }).handler(
  async () => {
    const headers = getRequestHeaders();

    return await auth.api.signOut({ headers });
  },
);

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();

    return await auth.api.getSession({
      headers,
    });
  },
);
