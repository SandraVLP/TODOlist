import axios, { AxiosResponse } from "axios";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  data: D;
};

type FieldErrorType = {
  error: string;
  field: string;
};
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "7dd11e48-780a-41b1-9d21-f1c9f2ef5559",
  },
});

export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>(`todo-lists/`);
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(
      `todo-lists/`,
      { title }
    );
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
    return promise;
  },
  getTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
    return promise;
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title});
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);

  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>,AxiosResponse<ResponseType<{ item: TaskType }>>,UpdateTaskModelType> (`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
