import { v1 } from "uuid";
import { TodolistType } from "../App";
import { FilterValuesType } from "../App";


let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
    id: string
}
 
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
    title: string
    todoID: string
}
 
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  payload: {
    id: string
    title: string
  }
}
 
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  payload: {
    id: string
    filter: FilterValuesType
  }
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
      // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
      const newTodoList: TodolistType = {
        id: action.todoID,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodoList];
      // логика по добавлению тудулиста
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, title: action.payload.title }
          : tl
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, filter: action.payload.filter }
          : el
      );
    }
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST',  id: todolistId  } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todoID: v1() } as const
}

export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload: { title, id } } as const
}

export const changeTodolistFilterAC = (    id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
}