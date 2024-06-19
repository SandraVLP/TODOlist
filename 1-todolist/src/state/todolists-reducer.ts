import { v1 } from "uuid";
import { TodolistType } from "../api/todolists-api";
import { Dispatch } from 'redux';
import { todolistAPI } from "../api/todolists-api";




let todolistID1 = v1();
let todolistID2 = v1();


export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
    id: string
}
 
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
todolist: TodolistType
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

export type SetTodolistsActionType = {
  type: 'SET-TODOLISTS'
  todolists: Array<TodolistType>
}

export type FilterValuesType = "all" | "active" | "completed";

const initialState: Array<TodolistDomainType> =  []

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

 

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
      // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
      return [{...action.todolist, filter: 'all'}, ...state]
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
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({
          ...tl,
          filter: 'all'
      }))
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST',  id: todolistId  } as const
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist} as const
}

export const changeTodolistTitleAC = ( id: string, title: string,): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload: { title, id } } as const
}

export const changeTodolistFilterAC = (    id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
}



export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
  return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsThunk = (dispatch: Dispatch) => {
  todolistAPI.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data)) 
  })
}

export const addTodolistTC =
  (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {
      const todolist = res.data.data.item
      const action = addTodolistAC(todolist);
      dispatch(action);
    });
  };

  export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      const action = removeTodolistAC(todolistId);
      dispatch(action);
    });
  };  

  export const updateTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      const action = changeTodolistTitleAC(todolistId, title);
      dispatch(action);
    });
  };  