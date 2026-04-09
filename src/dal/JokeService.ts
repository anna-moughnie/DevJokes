import type {
  CreateJokeServiceInput,
  DeleteJokeServiceInput,
  Joke,
  VoteJokeInput,
} from "#/types";
import { and, eq, sql } from "drizzle-orm";
import type { DbClient } from "./db/client";
import { commentsTable, jokesTable } from "./db/schema";

export class JokeService {
  constructor(private readonly db: DbClient) {}

  async getJokes(): Promise<Joke[]> {
    const rows = await this.db.query.jokesTable.findMany({
      with: {
        comments: {
          columns: {
            body: true,
          },
          orderBy: (comment, { asc }) => [asc(comment.createdAt)],
        },
      },
      orderBy: (joke, { asc }) => [asc(joke.createdAt)],
    });

    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      score: row.score,
      author_id: row.author_id,
      comments: row.comments.map((comment) => comment.body),
    }));
  }

  async createJoke(input: CreateJokeServiceInput): Promise<Joke> {
    const [insertedJoke] = await this.db
      .insert(jokesTable)
      .values({
        question: input.question.trim(),
        answer: input.answer.trim(),
        score: 0,
        author_id: input.authorId,
      })
      .returning({
        id: jokesTable.id,
        question: jokesTable.question,
        answer: jokesTable.answer,
        score: jokesTable.score,
        author_id: jokesTable.author_id,
      });

    if (!insertedJoke) {
      throw new Error("Failed to insert joke.");
    }

    return {
      ...insertedJoke,
      comments: [],
    };
  }

  async voteJoke(input: VoteJokeInput): Promise<Joke> {
    const [updatedJokeRow] = await this.db
      .update(jokesTable)
      .set({
        score: sql<number>`${jokesTable.score} + ${input.delta}`,
      })
      .where(eq(jokesTable.id, input.id))
      .returning({
        id: jokesTable.id,
        question: jokesTable.question,
        answer: jokesTable.answer,
        score: jokesTable.score,
        author_id: jokesTable.author_id,
      });

    if (!updatedJokeRow) {
      throw new Error("Joke not found.");
    }

    const comments = await this.db.query.commentsTable.findMany({
      columns: {
        body: true,
      },
      where: eq(commentsTable.jokeId, input.id),
      orderBy: (comment, { asc }) => [asc(comment.createdAt)],
    });

    const updatedJoke = {
      ...updatedJokeRow,
      comments: comments.map((comment) => comment.body),
    };

    return updatedJoke;
  }

  async deleteJoke(input: DeleteJokeServiceInput): Promise<void> {
    const result = await this.db
      .delete(jokesTable)
      .where(
        and(
          eq(jokesTable.id, input.id),
          eq(jokesTable.author_id, input.userId),
        ),
      );

    const wasDeleted = Number(result.rowCount ?? 0) > 0;

    if (!wasDeleted) {
      throw new Error("Joke not found.");
    }
  }
}
