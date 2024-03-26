import React from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";
import { TaskType } from "./App";
import { useState } from "react";
import { KeyboardEvent } from "react";
import { ChangeEvent } from "react";



type PropsType = {
  todoID: string
  title: string;
  tasks: TaskType[];
  removeTask: (todoID: string, taskId: string) => void;
  changeFilter: (todoID: string, filter: FilterValuesType) => void;
  addTask: (todoID: string, title: string) => void;
  changeTaskStatus: (todoID: string, taskId: string, taskStatus: boolean) => void;
  removeTodoList: (todoID: string) => void;
  filter: string;
};

export const Todolist = ({
  title,
  tasks,
  todoID,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  removeTodoList
}: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const tasksList = tasks.map((task: TaskType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(todoID, task.id, newStatusValue);
    };
    return (
      <li key={task.id} className={task.isDone ? 'is-done' : ''}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler}
        />{" "}
        <span>{task.title}</span>
        <Button title="x" onClick={() => removeTask(todoID,task.id)} />
      </li>
    );
  });

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addTask(todoID, taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: any) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addTaskHandler();
      
    }
  };

  const removeListHandler = () => {
    removeTodoList(todoID)

  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todoID, filter);
  };

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }


  return (
    <div>
      <h3>{title}</h3>
      <Button title="x" onClick={removeListHandler}/>
      <div>
        <input
        className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button
          title="+"
          onClick={() => {
            addTaskHandler();
          }}
        />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? <p>No tasks</p> : <ul>{tasksList}</ul>}
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''} title={"All"} onClick={() => changeFilterTasksHandler("all")} />
        <Button className={filter === 'active' ? 'active-filter' : ''}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button className={filter === 'completed' ? 'active-filter' : ''}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
