export type User = {
  _id: Object;
  username: string;
  email: string;
  role: string;
  password: string;
};

export type UserPayload = Pick<User, "_id" | "email" | "role">;
export type UserRegister = Pick<User, "username" | "email" | "password">;

export type Post = {
  _id: Object;
  title: string;
  description: string;
  urlImages: string[];
  author: Object;
};

export type PostCreated = Pick<Post, "title" | "description" | "urlImages">;
export type PostUpdated = PostCreated
