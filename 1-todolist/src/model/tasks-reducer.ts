import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todoID]: state[action.todoID].filter(
          (t) => t.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      return {
        ...state,
        [action.todoID]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todoID],
        ],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todoID]: state[action.todoID].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todoID]: state[action.todoID].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todoID]: [],
      };
    }
    case "REMOVE-TODOLIST": {
        const stateCopy = {...state};
        delete stateCopy[action.id]
        return stateCopy;
    }
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTaskAC = (todoID: string, taskId: string) => {
  return { type: "REMOVE-TASK", todoID, taskId } as const;
};
export const addTaskAC = (todoID: string,title: string )  => {
  return { type: "ADD-TASK", title, todoID } as const;
};
export const changeTaskStatusAC = (
  todoID: string,
  taskId: string,
  isDone: boolean,
) => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todoID } as const;
};

export const changeTaskTitleAC = (
  
  todoID: string,
  taskId: string,
  title: string,
) => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todoID } as const;
};
