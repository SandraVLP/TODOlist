import React from "react";
import { KeyboardEvent } from "react";
// import { Button } from './Button';
import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

type Props = {
  addItem: (title: string) => void;
};

const AddItemForm = ({ addItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const changeTaskTitleHandler = (event: any) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };
  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={error ? "error" : ""}
        value={taskTitle}
        size={"small"}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
        error={!!error}
        helperText={error}
      />
            <IconButton onClick={() => {
          addTaskHandler();
        }} color={'primary'} >
        <AddBoxIcon />
      </IconButton>
      {/* {error && <div className={'error-message'}>{error}</div>} */}
    </div>
  );
};

export default AddItemForm;
