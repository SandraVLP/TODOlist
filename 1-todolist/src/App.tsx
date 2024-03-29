import React from "react";
import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";

import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()
   
  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])
   
  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })
  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Redux", isDone: false },
  // ]);

  const changeTaskStatus = (todoID: string, taskId: string, taskStatus: boolean) => {
    // const updatedState = tasks.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
    // setTasks(updatedState)
    setTasks({...tasks, [todoID]: tasks[todoID].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)})
  }

  const removeTask = (todoID: string,taskId: string) => {
    setTasks({...tasks,[todoID]:tasks[todoID].filter(el => el.id!==taskId)})
    // const filteredTasks = tasks.filter((task) => {
    //   return task.id !== taskId;
    // });
    // setTasks(filteredTasks);
  };

  const removeTodoList = (todoID: string) => {
    setTodolists(todolists.filter(el => el.id !== todoID))
    delete tasks[todoID]
  }

  const addTask = (todoID: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    }
    // setTasks({...tasks, [todoID]: [...tasks[todoID], newTask]})
    setTasks((prevState) => ({...prevState, [todoID]: [...prevState[todoID], newTask]}))
    // const updatedTasks = [newTask, ...tasks]
    // setTasks(updatedTasks)
  }
  

  // const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (todoID: string, newFilter: FilterValuesType) => {
    // const currentTodoList = todolists.find(el => el.id === todoID)
    // if (currentTodoList) {
    //   currentTodoList.filter = newFilter
    //    setTodolists([...todolists]);
    // }
   setTodolists(todolists.map(el => el.id === todoID ? {...el, filter:newFilter} : el))
  };





  return (
    <div className="App">
      {todolists.map((el) => {
          let tasksForTodolist = tasks[el.id];
          if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter((task) => !task.isDone);
          }
        
          if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter((task) => task.isDone);
          }
        return (<div>
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
      />
      </div>
      )})}
      
    </div>
  );
}

export default App;
