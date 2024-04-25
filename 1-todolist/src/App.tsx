import React from "react";
import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
 
type ThemeMode = 'dark' | 'light'

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
  [key: string]: Array<TaskType>

}

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#ef6c00',
      },
    },
  })
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });
  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Redux", isDone: false },
  // ]);
  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const changeTaskStatus = (
    todoID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    // const updatedState = tasks.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
    // setTasks(updatedState)
    setTasks({
      ...tasks,
      [todoID]: tasks[todoID].map((el) =>
        el.id === taskId ? { ...el, isDone: taskStatus } : el
      ),
    });
  };

  const removeTask = (todoID: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoID]: tasks[todoID].filter((el) => el.id !== taskId),
    });
    // const filteredTasks = tasks.filter((task) => {
    //   return task.id !== taskId;
    // });
    // setTasks(filteredTasks);
  };

  const removeTodoList = (todoID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todoID));
    delete tasks[todoID];
  };

  const addTask = (todoID: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTodolistTasks = {
      ...tasks,
      [todoID]: [newTask, ...tasks[todoID]],
    };
    setTasks(newTodolistTasks);
  };

  // const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (todoID: string, newFilter: FilterValuesType) => {
    // const currentTodoList = todolists.find(el => el.id === todoID)
    // if (currentTodoList) {
    //   currentTodoList.filter = newFilter
    //    setTodolists([...todolists]);
    // }
    setTodolists(
      todolists.map((el) =>
        el.id === todoID ? { ...el, filter: newFilter } : el
      )
    );
  };

  const addTodoList = (title: string) => {
    const todolistID = v1();
    const newTodoList: TodolistType = {
      id: todolistID,
      title: title,
      filter: "all",
    };
    setTodolists([...todolists, newTodoList]);
    setTasks({ ...tasks, [todolistID]: [] });
  };

  const updateTaskTitle = (
    todoID: string,
    taskId: string,
    newTitle: string
  ) => {
    setTasks({
      ...tasks,
      [todoID]: tasks[todoID].map((el) =>
        el.id === taskId ? { ...el, title: newTitle } : el
      ),
    });
  };

  const updateTodolistTitle = (todoID: string, newTitle: string) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todoID ? { ...el, title: newTitle } : el
      )
    );
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
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container sx={{ mb: "30px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid2>
        <Grid2 container spacing={4}>
          {todolists.map((el) => {
            let tasksForTodolist = tasks[el.id];
            if (el.filter === "active") {
              tasksForTodolist = tasks[el.id].filter((task) => !task.isDone);
            }

            if (el.filter === "completed") {
              tasksForTodolist = tasks[el.id].filter((task) => task.isDone);
            }
            return (
              <Grid2>
                <Paper sx={{ p: "0 20px 20px 20px" }}>
                  <Todolist
                    key={el.id}
                    todoID={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
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

export default App;
