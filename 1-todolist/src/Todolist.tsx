import React from "react";
import { Button } from "@mui/material";
import { FilterValuesType } from "./App";
import { TaskType } from "./App";
import { ChangeEvent } from "react";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx } from './Todolist.styles';
import { getListItemSx } from "./Todolist.styles";

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
  updateTodolistTitle,
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
      <ListItem
        disableGutters
        disablePadding
        key={task.id}
        sx={getListItemSx(task.isDone)}
      >
        <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan
          oldTitle={task.title}
          updateTitle={(newTitle: string) => {
            updateTaskTitleHandler(task.id, newTitle);
          }}
        />
        </div>

        <IconButton onClick={() => removeTask(todoID, task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  const removeListHandler = () => {
    removeTodoList(todoID);
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todoID, filter);
  };

  const addTaskHandler = (title: string) => {
    addTask(todoID, title);
  };
  const updateTodolistTitleHandler = (newTitle: string) => {
    updateTodolistTitle(todoID, newTitle);
  };

  const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
    console.log(newTitle);
    updateTaskTitle(todoID, taskId, newTitle);
  };

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
      {/* <div>
        <input
        className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        {error && <div className={'error-message'}>{error}</div>}
      </div> */}
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
};
