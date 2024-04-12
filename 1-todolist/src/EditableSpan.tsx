import React, { ChangeEvent, useState } from "react";

type Props = {
  oldTitle: string;
  updateTitle: (newTitle:string) => void
};

export const EditableSpan = ({ oldTitle, updateTitle }: Props) => {
    const[edit, setEdit] = useState(false);
    const[newTitle, setNewTitle] = useState(oldTitle) 
//     const activetEditModeHandler = () => {
// setEdit(true)
//     }

//     const deActivetEditModeHandler = () => {
//         setEdit(false)
//             }

    const editHandler = () => {
        setEdit(!edit);
        if (edit) {
            updateTitleHandler()
        }
      
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)

    }

    const updateTitleHandler = () => {
        updateTitle(newTitle.trim());

      };
    

  return (

        edit
      ? <input value={newTitle}  onBlur={editHandler} autoFocus onChange={changeTitleHandler}/> :
      <span onDoubleClick={editHandler}>{oldTitle}</span> 
      
 
  );
};
