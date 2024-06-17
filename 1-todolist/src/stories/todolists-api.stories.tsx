import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist("Todolist-api").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);


  useEffect(() => {
    const todolistId = "06967eaf-c16e-4593-9206-5dfa6fdb6391";
    todolistAPI.deleteTodolist(
        todolistId
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "9ee76d51-18b7-450b-8093-622b6dc35d34";
    todolistAPI.updateTodolist(todolistId, "JS").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "602d68b2-c2c2-466e-940a-f9cbe131275d";
      todolistAPI.getTasks(todolistId).then((res) => {
        setState(res.data);
      });

    }, []);
    return <div>{JSON.stringify(state)}</div>;
  };

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "602d68b2-c2c2-466e-940a-f9cbe131275d";
      todolistAPI.createTask(todolistId, 'NullTask').then((res) => {
        setState(res.data);
      });

    }, []);
    return <div>{JSON.stringify(state)}</div>;
  };

//   export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null);
//     useEffect(() => {
//         const todolistId = "602d68b2-c2c2-466e-940a-f9cbe131275d";
//         const taskId = "8d09f853-0954-4149-b5e5-b4a67c2be823";
//       todolistAPI.updateTaskTitle(todolistId, taskId, ).then((res) => {
//         setState(res.data);
//       });

//     }, []);
//     return <div>{JSON.stringify(state)}</div>;
//   };

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "602d68b2-c2c2-466e-940a-f9cbe131275d";
        const taskId = "8d09f853-0954-4149-b5e5-b4a67c2be823";
      todolistAPI.deleteTask(todolistId, taskId).then((res) => {
        setState(res.data);
      });

    }, []);
    return <div>{JSON.stringify(state)}</div>;
  };