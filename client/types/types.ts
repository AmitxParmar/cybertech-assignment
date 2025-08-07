export type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: string;
  author: Partial<User>;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
