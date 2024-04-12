import React from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";
import { TaskType } from "./App";
import { useState } from "react";
import { KeyboardEvent } from "react";
import { ChangeEvent } from "react";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";



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
  updateTaskTitle: (todoID: string, taskId: string, newTitle: string) => void
  updateTodolistTitle: (todoID: string, newTitle: string) => void
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
  removeTodoList,
  updateTaskTitle,
  updateTodolistTitle
}: PropsType) => {
  // const [taskTitle, setTaskTitle] = useState("");
  // const [error, setError] = useState<string | null>(null);

  const tasksList = tasks.map((task: TaskType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(todoID, task.id, newStatusValue);
    };
    let tasksForTodolist = tasks;
    if (filter === "active") {
      tasksForTodolist = tasks.filter((task) => !task.isDone);
    }
  
    if (filter === "completed") {
      tasksForTodolist = tasks.filter((task) => task.isDone);
    }

    // const updateTaskTitleHandler = (newTitle:string) => {
    //   console.log(newTitle)
    //   updateTaskTitle(todoID,task.id, newTitle )
    // }
  
    return (
      <li key={task.id} className={task.isDone ? 'is-done' : ''}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler}
        />{" "}
        <EditableSpan oldTitle={task.title} updateTitle={(newTitle: string) => {updateTaskTitleHandler(task.id, newTitle)}}/>
        {/* <span>{task.title}</span> */}
        <Button title="x" onClick={() => removeTask(todoID,task.id)} />
      </li>
    );
  });


  const removeListHandler = () => {
    removeTodoList(todoID)

  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todoID, filter);
  };


  const addTaskHandler = (title: string) => {
    addTask(todoID, title)
  }
const updateTodolistTitleHandler = (newTitle: string) => {
  updateTodolistTitle(todoID, newTitle)
}

const updateTaskTitleHandler = (taskId: string, newTitle:string) => {
  console.log(newTitle)
  updateTaskTitle(todoID,taskId, newTitle )
}

  return (
    <div>
      {/* <h3>{title}</h3> */}
      <h3> <EditableSpan oldTitle={title} updateTitle={updateTodolistTitleHandler}/></h3>
      <Button title="x" onClick={removeListHandler}/>
      <AddItemForm addItem={addTaskHandler}/>
      {/* <div>
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
      </div> */}
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
