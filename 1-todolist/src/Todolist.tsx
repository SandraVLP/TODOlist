import React from 'react'

type PropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
 
export const Todolist = ({title, tasks}: PropsType) => {
const tasksList = tasks.map((task: TaskType) => {
    return (
        <li key={task.id}>
        <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
      </li>
    )
})

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
{tasks.length === 0 ? (
    <p>No tasks</p>
) : (

    <ul>
    {tasksList}
    </ul>
)}

      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}