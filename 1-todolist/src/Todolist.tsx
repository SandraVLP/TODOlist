import React from 'react'
import { Button } from './Button'
import { FilterValuesType } from './App'

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
 
export const Todolist = ({title, tasks, removeTask, changeFilter}: PropsType) => {
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
        <Button title={'All'} onClick={() => changeFilter('all')}/>
        <Button title={'Active'} onClick={() => changeFilter('active')}/>
        <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
      </div>
    </div>
  )
}