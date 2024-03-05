import React from "react";
import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

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

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
