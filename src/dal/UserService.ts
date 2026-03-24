import { user } from "./db/schema";
import type { DbClient } from "./db/client";
import type { CreateUserInput } from "#/types";
import bcrypt from "bcrypt";

export class UserService {
    constructor(private readonly db: DbClient) {}

    // async createUser(input: CreateUserInput) {
    //     // validation would go here
    //     const hashedPassword = await bcrypt.hash(input.password, 10);

    //     const [newUser] = await this.db
    //         .insert(user)
    //         .values({
    //             full_name: input.fullname.trim(),
    //             email: input.email.trim().toLowerCase(),
    //             password: hashedPassword,
    //         })
    //         .returning({
    //             id: user.id,
    //             email: user.email,
    //         });

    //     if (!newUser) {
    //         throw new Error("Failed to create user.");
    //     }

    //     return newUser;
    // }
}
