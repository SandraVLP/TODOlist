import React from "react";
import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  const removeTask = (taskId: number) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const [filter, setFilter] = useState<FilterValuesType>('all')
const changeFilter = (filter: FilterValuesType) => {setFilter(filter)}

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone)
  }
   
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone)
  }

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
