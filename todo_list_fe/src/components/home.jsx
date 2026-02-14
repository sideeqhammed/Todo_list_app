import { useState } from "react"
import Tabs from "./tabs"
import Header from "./header"

function Home() {

  const [taskInput, setTaskInput] = useState(false)
  const [taskText, setTaskText] = useState('')
  const [todos, setTodos] = useState([])
  const [editText, setEditText] = useState('')
  const addTask = () => {
    setTaskInput(true)
  }
  const createTask = () => {
    const todo = {
      id: Date.now(),
      text: taskText,
      completed: false,
      edit: false,
    }
    setTodos([...todos, todo])
    setTaskText('')
    setEditText(todo.text)
  }
  const editTask = (id, text) => {
    setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: text, edit: !todo.edit} : todo))
    setEditText(text)
  }
  const deleteTask = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }


  return(
    <>
    <Header />
    
    <div className="bg-gray-200 mx-auto md:w-2xl p-5 rounded-2xl">
  
      <Tabs />

      <div>
        <div className="flex justify-between mt-3 mb-5 items-center">
          <h2 className="text-2xl">Tasks</h2>
          <button onClick={addTask} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">➕ Add New Task</button>
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
                  if (e.key === "Enter") createTask()
                  if (e.key === "Escape") setTaskText('')
                }}
                className=" border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none"
              /> 
              <button onClick={createTask} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">Add</button>
            </div>
            : ''
          }
          <ul className="">
            {todos.map(todo => (
              <li key={todo.id} className="flex justify-between items-center flex-wrap bg-gray-200 mb-3 text-lg p-2 rounded-lg">
                <div className="flex gap-1">
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      setTodos(prev => prev.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t ))
                    }}
                  />
                  <div style={{textDecoration: todo.completed ? 'line-through' : 'none'}} className="wrap-break-word max-w-72 md:max-w-70 pb-1">
                    {todo.edit ? 
                      <div>
                        <input 
                          value={editText} 
                          autoFocus
                          onChange={e => setEditText(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") editTask(todo.id, editText)
                            if (e.key === "Escape") editTask(todo.id, todo.text)
                          }}
                          className=" border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none"
                          // onBlur={() => edit}
                        /> 
                      </div>
                      : todo.text}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editTask(todo.id, editText)
                    }}
                    className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105"
                  >{todo.edit === false ? '✏️ Edit' : '✔️ Done'}</button>
                  <button 
                    onClick={() => {
                      deleteTask(todo.id)
                    }} className=" bg-red-700 py-1 px-2 rounded-sm hover:scale-105">🗑️ Delete</button>
                </div>
                
                {/* {console.log(todo.edit)} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      
    </div>
    </>
  )
}

export default Home