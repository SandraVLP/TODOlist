import React from "react";
import { useState } from "react";
import "./App.css";
import AddItemForm from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import { TodolistWithRedux } from "./TodolistRedux";

type ThemeMode = "dark" | "light";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#ef6c00",
      },
    },
  });


let todolists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
// let tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

let dispatch = useDispatch()

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const changeTaskStatus = (
    todoID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    dispatch(changeTaskStatusAC(todoID, taskId, taskStatus));
  };

  const removeTask = (todoID: string, taskId: string) => {
    // let action = removeTaskAC(todoID, taskId)
    dispatch(removeTaskAC(todoID, taskId));
  };

  const removeTodoList = (todoID: string) => {
    dispatch(removeTodolistAC(todoID));

  };

  const addTask = (todoID: string, title: string) => {
    dispatch(addTaskAC(todoID, title));
  };

  // const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (todoID: string, newFilter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todoID, newFilter));
  };

  const addTodoList = (title: string) => {
    dispatch(addTodolistAC(title));

  };

  const updateTaskTitle = (
    todoID: string,
    taskId: string,
    newTitle: string
  ) => {
    dispatch(changeTaskTitleAC(todoID, taskId, newTitle));
  };

  const updateTodolistTitle = (todoID: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todoID, newTitle));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <MenuButton>Login</MenuButton>
              <MenuButton>Logout</MenuButton>
              <MenuButton background={theme.palette.primary.dark}>
                Faq
              </MenuButton>
              <Switch color={"default"} onChange={changeModeHandler} />
            </div>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid2 container sx={{ mb: "30px" }}>
            <AddItemForm addItem={addTodoList} />
          </Grid2>
          <Grid2 container spacing={4}>
            {todolists.map((el) => {

              return (
                <Grid2 key={el.id}>
                  <Paper sx={{ p: "0 20px 20px 20px" }}>
                    <TodolistWithRedux
                    todolist={el}

                    />
                  </Paper>
                </Grid2>
              );
            })}
          </Grid2>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AppWithRedux;
