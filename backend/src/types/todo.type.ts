export enum TodoStatus {
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
}

export enum TodoFilter {
  ALL = "all",
  COMPLETED = "completed",
  ACTIVE = "active",
}

export type CoreType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type Todo = CoreType & {
  title: string;
  description: string;
  isCompleted: boolean;
};

export type CreateTodo = Omit<
  Todo,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "isCompleted"
>;
