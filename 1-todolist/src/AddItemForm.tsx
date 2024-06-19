import React from "react";
import { KeyboardEvent, memo } from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

type Props = {
  addItem: (title: string) => void;
};

const AddItemForm = memo( ({ addItem }: Props) => {

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
    if (error) setError(null);
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
});

export default AddItemForm;
