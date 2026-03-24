import { createServerFn } from "@tanstack/react-start";
import type { CreateUserInput } from "#/types";

export const creaetUser = createServerFn({ method: "POST" })
    .inputValidator((input: CreateUserInput) => input)
    .handler(async ({ data, context }) => {
        return context.userService.createUser(data);
    });
