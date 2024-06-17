import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type Props = {
  oldTitle: string;
  updateTitle: (newTitle: string) => void;
};

export const EditableSpan = React.memo ( ({ oldTitle, updateTitle }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(oldTitle);

  const editHandler = () => {
    setEdit(!edit);
    if (edit) {
      updateTitleHandler();
    }
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const updateTitleHandler = () => {
    updateTitle(newTitle.trim()); 
  };

  return edit ? (
    <TextField
      variant={"outlined"}
      value={newTitle}
      size={"small"}
      onChange={changeTitleHandler}
      onBlur={editHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editHandler}>{oldTitle}</span>
  );
});

