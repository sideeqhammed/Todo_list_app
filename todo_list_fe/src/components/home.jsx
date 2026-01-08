import { useState } from "react"

function Home() {

  const [taskInput, setTaskInput] = useState(false)
  const [taskText, setTaskText] = useState('')
  const [todos, setTodos] = useState([])
  const addTask = () => {
    setTaskInput(true)
  }
  const createTask = () => {
    const todo = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
    setTodos([...todos, todo])
    setTaskText('')
  }

  return(
    <div className="bg-gray-200 mx-auto md:w-2xl p-5 rounded-2xl">
      
      <div className="flex justify-center p-3">
        <ul className="flex bg-white rounded-lg">
          <li className="text-xl p-4 rounded-md">All Tasks</li>
          <li className="text-xl p-4 rounded-md">Today</li>
          {/* <li>Pending</li> */}
          <li className="text-xl p-4">Overdue</li>
        </ul>
      </div>

      <div>
        <div className="flex justify-between mt-3 mb-5 items-center">
          <h2 className="text-2xl">Tasks</h2>
          <button onClick={addTask} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">+ Add New Task</button>
        </div>
        <div className="bg-gray-300 my-2 p-3 rounded-lg">
          {
            taskInput ? 
            <div className="flex justify-center gap-3 mb-6">
              <input type="text" name="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} className=" border-2 py-1 px-2 rounded-md hover:scale-101"/> 
              <button onClick={createTask} className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105">Add</button>
            </div>
            : ''
          }
          <ul className="">
            {todos.map(todo => (
              <li key={todo.id} style={{textDecoration: todo.completed ? 'line-through' : 'none'}} className="flex justify-between items-center bg-gray-200 mb-3 text-lg p-2 rounded-lg">
                <div>
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      setTodos(prev => prev.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t ))
                    }}
                  />
                  {' ' + todo.text}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setTodos()
                    }}
                    className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105"
                  >Edit</button>
                  <button className=" bg-red-700 py-1 px-2 rounded-sm hover:scale-105">Delete</button>
                </div>
                
              </li>
            ))}
        
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Home