import React from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";
import { TaskType } from "./App";
import { useState } from "react";
import { KeyboardEvent } from "react";
import { ChangeEvent } from "react";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus:(taskId: string, taskStatus: boolean) => void;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus
}: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");


  const tasksList = tasks.map((task: TaskType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked
      changeTaskStatus(task.id, newStatusValue)
    }
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}  onChange={changeTaskStatusHandler}/>{" "}
        <span>{task.title}</span>
        <Button title="x" onClick={() => removeTask(task.id)} />
      </li>
    );
  });

  const addTaskHandler = () => {
    if  (taskTitle.trim() !== '') {
    addTask(taskTitle.trim());
            setTaskTitle("");}
  }

  const changeTaskTitleHandler = (event: any) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter)
  }



  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button
          title="+"
          onClick={() => {
            addTaskHandler()
          }}
        />
      </div>
      {tasks.length === 0 ? <p>No tasks</p> : <ul>{tasksList}</ul>}
      <div>
        <Button title={"All"} onClick={() => changeFilterTasksHandler("all")} />
        <Button title={"Active"} onClick={() => changeFilterTasksHandler("active")} />
        <Button title={"Completed"} onClick={() => changeFilterTasksHandler("completed")} />
      </div>
    </div>
  );
};
