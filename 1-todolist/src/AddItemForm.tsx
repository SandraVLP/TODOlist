import React from 'react'
import { KeyboardEvent } from "react";
import { Button } from './Button';
import { useState } from 'react';

type Props = {
    addItem: ( title: string) => void

}

const AddItemForm = ({addItem}: Props) => {
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
    setError(null)
    if (event.key === "Enter") {
      addTaskHandler();
      
    }
  };
  return (
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
      </div>)
}

export default AddItemForm