import { createServerFn } from "@tanstack/react-start";

export const creatUser = createServerFn({ method: "POST"})
    .inputValidator((input: ))