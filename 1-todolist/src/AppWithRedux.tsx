import React, { useCallback } from "react";
import { useState, useEffect } from "react";
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
  fetchTodolistsThunk,
  removeTodolistAC,
  setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType, AppThunkDispatch, useAppDispatch } from "./state/store";
import { Todolist } from "./Todolist";
import { TaskStatuses, TaskType, todolistAPI } from "./api/todolists-api";

type ThemeMode = "dark" | "light";

export type FilterValuesType = "all" | "active" | "completed";


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


  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  let dispatch = useAppDispatch();

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);
    }, []);

  const removeTask = useCallback((todoID: string, taskId: string) => {
    // let action = removeTaskAC(todoID, taskId)
    dispatch(removeTaskAC(todoID, taskId));
  }, [dispatch]);

  const removeTodoList = useCallback((todoID: string) => {
    dispatch(removeTodolistAC(todoID));
  }, [dispatch]);

  const addTask = useCallback((todoID: string, title: string) => {
    dispatch(addTaskAC(todoID, title));
  }, [dispatch]);

  // const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = useCallback(
    (todoID: string, newFilter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(todoID, newFilter));
    },
    [dispatch]
  );

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistAC(title));
  }, [dispatch]);

  const updateTaskTitle = useCallback(
    (todoID: string, taskId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(todoID, taskId, newTitle));
    },
    [dispatch]
  );

  const updateTodolistTitle = useCallback(
    (todoID: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todoID, newTitle));
    },
    [dispatch]
  );

  useEffect(() => {
    todolistAPI.getTodolists().then(res => {
  
      dispatch(fetchTodolistsThunk)
    })
  }, [])

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
                    <Todolist
                      key={el.id}
                      todoID={el.id}
                      title={el.title}
                      tasks={tasks[el.id]}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={el.filter}
                      removeTodoList={removeTodoList}
                      updateTaskTitle={updateTaskTitle}
                      updateTodolistTitle={updateTodolistTitle}
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
