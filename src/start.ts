import { createMiddleware, createStart } from "@tanstack/react-start";
import { JokeService } from "#/dal/JokeService";
import { UserService } from "./dal/UserService";
import { dbConnection } from "#/dal/db/client";

const jokeServiceMiddleware = createMiddleware({ type: "request" }).server(
    async ({ next }) => {
        const jokeService = new JokeService(dbConnection());
        const userService = new UserService(dbConnection());
        return next({
            context: {
                jokeService,
                userService,
            },
        });
    },
);

export const startInstance = createStart(() => ({
    requestMiddleware: [jokeServiceMiddleware],
}));
