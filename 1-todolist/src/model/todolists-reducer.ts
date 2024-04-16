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
    payload: {    id: string  }} 
export type AddTodolistActionType = {  
    type: 'ADD-TODOLIST'  
    payload: {    title: string  }} 
export type ChangeTodolistTitleActionType = {  
    type: 'CHANGE-TODOLIST-TITLE'  
    payload: {    id: string    
        title: string  }} 
export type ChangeTodolistFilterActionType = {  
    type: 'CHANGE-TODOLIST-FILTER'  
    payload: {    id: string    
        filter: FilterValuesType  }}

export type ActionsType = RemoveTodolistActionType |  AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType      

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: any
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.payload.id);
      // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
        const todolistID = v1()
        const newTodoList:TodolistType =  { id: todolistID, title: action.payload.title, filter: 'all' }
      return [...state, newTodoList];
      // логика по добавлению тудулиста
    }
    case "CHANGE-TODOLIST-TITLE": {
        return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.newTitle} : tl);
       
      }

      case "CHANGE-TODOLIST-FILTER": {
        return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.newFilter} : el)

      }
    default: 
      throw new Error("I don't understand this type");
    
  }
};
