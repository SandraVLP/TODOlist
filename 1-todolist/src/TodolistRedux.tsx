import React from "react";
import { Button } from "@mui/material";
import { FilterValuesType } from "./App";
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
import { TodolistType, TaskType } from "./AppWithRedux";
import { AppRootStateType } from "./model/store";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC, changeTaskStatusAC, removeTaskAC } from "./model/tasks-reducer";
import { changeTaskTitleAC } from "./model/tasks-reducer";
import { changeTodolistFilterAC, removeTodolistAC } from "./model/todolists-reducer";

type PropsType = {
  todolist: TodolistType

};

export const TodolistWithRedux = ({todolist}: PropsType) => {
  const {id, filter, title} = todolist;
  // const [taskTitle, setTaskTitle] = useState("");
  // const [error, setError] = useState<string | null>(null);
  // let todolists = useSelector<AppRootStateType,TodolistType>(state => state.todolists.filter(todo => todo.id === props.todoID)[0])
let tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[id])
let dispatch = useDispatch()

  const tasksList = tasks.map((task: TaskType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(id, task.id, newStatusValue));
    };

    if (filter === "active") {
      tasks = tasks.filter((task) => !task.isDone);
      }
    
      if (filter === "completed") {
        tasks = tasks.filter((task) => task.isDone);
      }

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

        <IconButton onClick={() => dispatch(removeTaskAC(id, task.id))}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  const removeListHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(id, filter));
  };

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC(id, title))
  };
  const updateTodolistTitleHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
    console.log(newTitle);
   dispatch(changeTaskTitleAC(id, taskId, newTitle));
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
