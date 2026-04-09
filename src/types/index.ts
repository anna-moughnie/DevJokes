import type { CommentRow, JokeRow } from "#/dal/db/schema";

export type Joke = Pick<
  JokeRow,
  "id" | "question" | "answer" | "score" | "author_id"
> & {
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

export interface VoteJokeServiceInput extends VoteJokeInput {
  userId: string;
}

export interface DeleteJokeInput {
  id: Joke["id"];
}

export interface DeleteJokeServiceInput extends DeleteJokeInput {
  userId: string;
}

export interface CreateUserInput {
  fullname: string;
  email: string;
  password: string;
}
