import { useEffect, useState } from "react"
import { fetchWithAuth } from "./refresh"
import useTodoStore from "../store/useTodoStore"

function Home() {

  const tasks = useTodoStore(state => state.tasks)
  const fetchTasks = useTodoStore(state => state.fetchTasks)
  const createTask = useTodoStore(state => state.createTask)
  const toggleTask = useTodoStore((state) => state.toggleTask)
  const taskInput = useTodoStore(state => state.taskInput)
  const addTask = useTodoStore(state => state.addTask)
  const taskText = useTodoStore(state => state.taskText)
  const setTaskText = useTodoStore(state => state.setTaskText)
  const filter = useTodoStore((state) => state.filter)
  const deleteTask = useTodoStore((state) => state.deleteTask)

  useEffect(() => {
    fetchTasks()
  }, [])


  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return task.completed === false
    if (filter === 'completed') return task.completed === true
  })


  // const editTask = (id, text) => {
  //   setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: text, edit: !todo.edit} : todo))
  //   setEditText(text)


  return(
    <>
      <div className="bg-gray-200 mx-auto mt-10 md:w-2xl p-5 rounded-2xl">
        <div className="flex justify-between mt-3 mb-5 items-center">
          <h2 className="text-2xl">Tasks</h2>
          {filter === 'all' ?
            <button onClick={addTask} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">➕ Add New Task</button>
            : ''
          }
        </div>

        <div className="bg-gray-300 my-2 p-3 rounded-lg">
          {
            taskInput ? 
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <input 
                type="text" 
                name="text" 
                value={taskText} 
                onChange={(e) => setTaskText(e.target.value)} 
                autoFocus 
                onKeyDown={e => {
                  if (e.key === "Enter") createTask(taskText)
                  if (e.key === "Escape") setTaskText('')
                }}
                className=" border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none"
              /> 
              <button onClick={() => {createTask(taskText)}} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">Add</button>
            </div>
            : ''
          }
          <ul className="">
            {filteredTasks.map(task => (
              <li key={task.id} className="flex justify-between items-center flex-wrap bg-gray-200 mb-3 text-lg p-2 rounded-lg">
                <div className="flex gap-1">
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <div style={{textDecoration: task.completed ? 'line-through' : 'none'}} className="wrap-break-word max-w-72 md:max-w-70 pb-1">
                    {task.title}
                  </div>
                </div>
                <div className="flex gap-2">

                  {/* <button
                    onClick={() => {
                      // editTask(todo.id, editText)
                    }}
                    className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105"
                  >{todo.edit === false ? '✏️ Edit' : '✔️ Done'}</button> */}

                  <button 
                    onClick={() => {
                      deleteTask(task.id)
                    }} className=" bg-red-700 py-1 px-2 rounded-sm hover:scale-105">🗑️ Delete</button>
                </div>
                
                {/* {console.log(todo.edit)} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home