import { createServerFn } from "@tanstack/react-start";
import type { CreateJokeInput, DeleteJokeInput, VoteJokeInput } from "#/types";
import { requireServerSession } from "#/dal/requireServerSession";

export const getJokes = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    return context.jokeService.getJokes();
  },
);

export const createJoke = createServerFn({ method: "POST" })
  .inputValidator((input: CreateJokeInput) => input)
  .handler(async ({ data, context }) => {
    const session = await requireServerSession();
    return context.jokeService.createJoke({
      question: data.question,
      answer: data.answer,
      authorId: session.user.id,
    });
  });

export const voteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: VoteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const session = await requireServerSession();
    return context.jokeService.voteJoke({
      id: data.id,
      delta: data.delta,
      userId: session.user.id,
    });
  });

export const deleteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: DeleteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const session = await requireServerSession();
    return context.jokeService.deleteJoke({
      id: data.id,
      userId: session.user.id,
    });
  });
