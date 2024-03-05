import React from 'react'
import { Button } from './Button'

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
 
export const Todolist = ({title, tasks, removeTask}: PropsType) => {
const tasksList = tasks.map((task: TaskType) => {
    return (
        <li key={task.id}>
        <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
        <Button title="x" onClick={() => removeTask(task.id)} />

      </li>
    )
})

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title='+'/>
      </div>
{tasks.length === 0 ? (
    <p>No tasks</p>
) : (

    <ul>
    {tasksList}
    </ul>
)}

      <div>
        <Button title={'All'}/>
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  )
}