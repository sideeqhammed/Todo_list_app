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
    <div>
      
      <div>
        <ul>
          <li>Today</li>
          <li>Pending</li>
          <li>Overdue</li>
        </ul>
      </div>

      <div>
        <h2>Tasks</h2>
        <button onClick={addTask}>+ Add New Task</button>
        {
          taskInput ? 
          <div>
            <input type="text" name="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} /> 
            <button onClick={createTask}>Add</button>
          </div>
          : ''
        }
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{textDecoration: todo.completed ? 'line-through' : 'none'}} >
              <label>
                <input 
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    setTodos(prev => prev.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t ))
                  }}
                />
                {todo.text}
              </label>
            </li>
          ))}

        </ul>
      </div>
      
    </div>
  )
}

export default Home