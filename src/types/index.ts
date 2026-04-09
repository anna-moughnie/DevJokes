import type { CommentRow, JokeRow } from "#/dal/db/schema";

export type Joke = Pick<JokeRow, "id" | "question" | "answer" | "score"> & {
  comments: CommentRow["body"][];
};

export interface CreateJokeInput {
  question: Joke["question"];
  answer: Joke["answer"];
}

export interface CreateJokeServiceInput extends CreateJokeInput {
  authorId: string;
}

export interface VoteJokeInput {
  id: Joke["id"];
  delta: 1 | -1;
}

export interface DeleteJokeInput {
  id: Joke["id"];
}

export interface CreateUserInput {
  fullname: string;
  email: string;
  password: string;
}
