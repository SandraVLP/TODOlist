import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { TaskType, TaskStatuses } from './api/todolists-api';
import { getListItemSx } from "./Todolist.styles";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";


type TaskPropsType = {
    task: TaskType
    todoID: string
    changeTaskStatus: 
      (id: string, status: TaskStatuses, todolistId: string) => void;
      updateTaskTitle: (todoID: string, taskId: string, newTitle: string) => void;
    removeTask: (todoID: string, taskId: string) => void;
}
export const Task = React.memo(({task, todoID, changeTaskStatus, updateTaskTitle, removeTask}: TaskPropsType) => {
    const onClickHandler = useCallback(() => removeTask(todoID, task.id), [task.id, todoID, removeTask]);

    const updateTaskTitleHandler = useCallback ((taskId: string, newTitle: string) => {
        updateTaskTitle(todoID, taskId, newTitle);
      }, [todoID, updateTaskTitle]);

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, todoID);
      };

    return (
        <ListItem
          disableGutters
          disablePadding
          key={task.id}
          sx={getListItemSx(task.status === TaskStatuses.Completed ? 'is-done' : '')}
        >
          <div>
          <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} />
          <EditableSpan
            oldTitle={task.title}
            updateTitle={(newTitle: string) => {
              updateTaskTitleHandler(task.id, newTitle);
            }}
          />
          </div>
  
          <IconButton onClick={onClickHandler}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      );
})
