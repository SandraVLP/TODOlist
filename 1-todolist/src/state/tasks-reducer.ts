import { TasksStateType } from "../AppWithRedux";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todolistAPI,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";
export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter((t) => t.id != action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state };

      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "ADD-TODOLIST": {
      return {
      ...state, [action.todolist.id]: []
      };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: "ADD-TASK", task };
};
export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, status, todolistId };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId };
};

export const setTasksAC = (
  tasks: TaskType[],
  todolistId: string
): SetTasksActionType => {
  return { type: "SET-TASKS", tasks, todolistId };
};

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(setTasksAC(tasks, todolistId));
  });
};
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = removeTaskAC(taskId, todolistId);
      dispatch(action);
    });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      const action = addTaskAC(task);
      dispatch(action);
    });
  };

export const updateTaskStatusTC = (
  taskId: string,
  todolistId: string,
  status: TaskStatuses
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
    // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });

    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          status: status,
        })
        .then(() => {
          const action = changeTaskStatusAC(taskId, status, todolistId);
          dispatch(action);
        });
    }
  };
};

export const updateTaskTitleTC = (
  taskId: string,
  todolistId: string,
  title: string
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
    // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

    // const allTasksFromState = getState().tasks;
    // const tasksForCurrentTodolist = allTasksFromState[todolistId];
    // const task = tasksForCurrentTodolist.find((t) => {
    //   return t.id === taskId;
    // });

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title: title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          status: task.status,
        })
        .then(() => {
          const action = changeTaskTitleAC(taskId, title, todolistId);
          dispatch(action);
        });
    }
  };
};
