import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { FilterValuesType } from "./App";
import { TaskType } from "./App";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx } from './Todolist.styles';
import { Task } from "./Task";

type PropsType = {
  todoID: string;
  title: string;
  tasks: TaskType[];
  removeTask: (todoID: string, taskId: string) => void;
  changeFilter: (todoID: string, filter: FilterValuesType) => void;
  addTask: (todoID: string, title: string) => void;
  changeTaskStatus: (
    todoID: string,
    taskId: string,
    taskStatus: boolean
  ) => void;
  removeTodoList: (todoID: string) => void;
  filter: string;
  updateTaskTitle: (todoID: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todoID: string, newTitle: string) => void;
};

export const Todolist = React.memo (({
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
  updateTodolistTitle,
}: PropsType) => {

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  const tasksList = tasksForTodolist.map((t) => <Task key={t.id} task={t} todoID={todoID}
  removeTask={removeTask}
  updateTaskTitle={updateTaskTitle}
  changeTaskStatus={changeTaskStatus} /> );

  const removeListHandler = () => {
    removeTodoList(todoID);
  };

  const changeFilterTasksHandler = useCallback ((filter: FilterValuesType) => {
    changeFilter(todoID, filter);
  }, [todoID, changeFilter]);

  const addTaskHandler = useCallback ((title: string) => {
    addTask(todoID, title)}, [addTask, todoID]) 
  
  const updateTodolistTitleHandler = useCallback ((newTitle: string) => {
    updateTodolistTitle(todoID, newTitle);
  }, [todoID, updateTodolistTitle]);

  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={title}
          updateTitle={updateTodolistTitleHandler}
        />
        <IconButton onClick={removeListHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? <p>No tasks</p> : <List>{tasksList}</List>}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          color={"inherit"}
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          className={filter === "active" ? "active-filter" : ""}
          variant={filter === "active" ? "outlined" : "text"}
          color={"primary"}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          variant={filter === "completed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
});
