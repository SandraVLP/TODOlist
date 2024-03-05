import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";


function App() {
    let tasks1: Array<TaskType> = [
      { id: 1, title: 'HTML&CSS', isDone: true },
      { id: 2, title: 'JS', isDone: true },
      { id: 3, title: 'ReactJS', isDone: false },
      { id: 4, title: 'Redux', isDone: false },
    ]
   
    const removeTask = (taskId: number) => {
      tasks1 = tasks1.filter(task => {
        return task.id !== taskId
      })
      console.log(tasks1)
    }
   
    return (
      <div className="App">
        <Todolist title="What to learn" tasks={tasks1} removeTask={removeTask} />
      </div>
    )
  }

export default App;
