// import React, { useReducer } from "react";
// import { useState } from "react";
// import "./App.css";
// import { Todolist } from "./Todolist";
// import { v1 } from "uuid";
// import AddItemForm from "./AddItemForm";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import { Container } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import { MenuButton } from "./MenuButton";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Switch from "@mui/material/Switch";
// import CssBaseline from "@mui/material/CssBaseline";
// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   removeTodolistAC,
//   todolistsReducer,
// } from "./state/todolists-reducer";
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   tasksReducer,
// } from "./state/tasks-reducer";

// type ThemeMode = "dark" | "light";

// export type FilterValuesType = "all" | "active" | "completed";

// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };

// export type TasksStateType = {
//   [key: string]: Array<TaskType>;
// };

// function AppWithReducer() {
//   const [themeMode, setThemeMode] = useState<ThemeMode>("light");
//   const theme = createTheme({
//     palette: {
//       mode: themeMode === "light" ? "light" : "dark",
//       primary: {
//         main: "#ef6c00",
//       },
//     },
//   });
//   let todolistID1 = v1();
//   let todolistID2 = v1();

//   let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
//     { id: todolistID1, title: "What to learn", filter: "all" },
//     { id: todolistID2, title: "What to buy", filter: "all" },
//   ]);

//   //   let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, ActionsType>>(todolistsReducer, [
//   //     {id: todolistId1, title: "What to learn", filter: "all"},
//   //     {id: todolistId2, title: "What to buy", filter: "all"}
//   // ])

//   let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//     [todolistID1]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true },
//       { id: v1(), title: "ReactJS", isDone: false },
//     ],
//     [todolistID2]: [
//       { id: v1(), title: "Rest API", isDone: true },
//       { id: v1(), title: "GraphQL", isDone: false },
//     ],
//   });

//   const changeModeHandler = () => {
//     setThemeMode(themeMode === "light" ? "dark" : "light");
//   };

//   const changeTaskStatus = (
//     todoID: string,
//     taskId: string,
//     taskStatus: boolean
//   ) => {
//     dispatchToTasks(changeTaskStatusAC(todoID, taskId, taskStatus));
//   };

//   const removeTask = (todoID: string, taskId: string) => {
//     // let action = removeTaskAC(todoID, taskId)
//     dispatchToTasks(removeTaskAC(todoID, taskId));
//   };

//   const removeTodoList = (todoID: string) => {
//     let action = removeTodolistAC(todoID)
//     dispatchToTodolists(action);
//     dispatchToTasks(action);
//   };

//   const addTask = (todoID: string, title: string) => {
//     dispatchToTasks(addTaskAC(todoID, title));
//   };

//   // const [filter, setFilter] = useState<FilterValuesType>("all");
//   const changeFilter = (todoID: string, newFilter: FilterValuesType) => {
//     dispatchToTodolists(changeTodolistFilterAC(todoID, newFilter));
//   };

//   const addTodoList = (title: string) => {
//     let action = addTodolistAC(title);
//     dispatchToTodolists(action);
//     dispatchToTasks(action);
//   };

//   const updateTaskTitle = (
//     todoID: string,
//     taskId: string,
//     newTitle: string
//   ) => {
//     dispatchToTasks(changeTaskTitleAC(todoID, taskId, newTitle));
//   };

//   const updateTodolistTitle = (todoID: string, newTitle: string) => {
//     dispatchToTodolists(changeTodolistTitleAC(todoID, newTitle));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className="App">
//         <AppBar position="static" sx={{ mb: "30px" }}>
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <IconButton color="inherit">
//               <MenuIcon />
//             </IconButton>
//             <div>
//               <MenuButton>Login</MenuButton>
//               <MenuButton>Logout</MenuButton>
//               <MenuButton background={theme.palette.primary.dark}>
//                 Faq
//               </MenuButton>
//               <Switch color={"default"} onChange={changeModeHandler} />
//             </div>
//           </Toolbar>
//         </AppBar>
//         <Container fixed>
//           <Grid2 container sx={{ mb: "30px" }}>
//             <AddItemForm addItem={addTodoList} />
//           </Grid2>
//           <Grid2 container spacing={4}>
//             {todolists.map((el) => {
//               let tasksForTodolist = tasks[el.id];
//               if (el.filter === "active") {
//                 tasksForTodolist = tasks[el.id].filter((task) => !task.isDone);
//               }

//               if (el.filter === "completed") {
//                 tasksForTodolist = tasks[el.id].filter((task) => task.isDone);
//               }
//               return (
//                 <Grid2>
//                   <Paper sx={{ p: "0 20px 20px 20px" }}>
//                     <Todolist
//                       key={el.id}
//                       todoID={el.id}
//                       title={el.title}
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}
//                       changeTaskStatus={changeTaskStatus}
//                       filter={el.filter}
//                       removeTodoList={removeTodoList}
//                       updateTaskTitle={updateTaskTitle}
//                       updateTodolistTitle={updateTodolistTitle}
//                     />
//                   </Paper>
//                 </Grid2>
//               );
//             })}
//           </Grid2>
//         </Container>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default AppWithReducer;
