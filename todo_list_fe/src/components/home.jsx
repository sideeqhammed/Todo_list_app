import { useEffect, useState } from "react"
import { fetchWithAuth } from "./refresh"

function Home() {

  const [taskInput, setTaskInput] = useState(false)
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])
  const [editText, setEditText] = useState('')
  const addTask = () => {
    setTaskInput(true)
  }

  const fetchTask = async() => {
    try{
      const response = await fetchWithAuth("http://localhost:8000/todo/task/")
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      const tasks = await response.json()
      setTasks(tasks)
      console.log(tasks)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])


  const createTask = async() => {
    try {
      const response = await fetchWithAuth("http://localhost:8000/todo/task/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskText,
        }),
      })
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      fetchTask()
      console.log(response)
    } catch(err) {
      console.error(err)
    }
  }



  // const editTask = (id, text) => {
  //   setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: text, edit: !todo.edit} : todo))
  //   setEditText(text)
  // }
  // const deleteTask = (id) => {
  //   setTodos(prev => prev.filter(t => t.id !== id))
  // }


  return(
    <>

      <div className="bg-gray-200 mx-auto mt-10 md:w-2xl p-5 rounded-2xl">
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
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center flex-wrap bg-gray-200 mb-3 text-lg p-2 rounded-lg">
                <div className="flex gap-1">
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                     
                    }}
                  />
                  <div style={{textDecoration: task.completed ? 'line-through' : 'none'}} className="wrap-break-word max-w-72 md:max-w-70 pb-1">
                    {task.title}    
                  </div>
                </div>
                {/* <div className="flex gap-2">
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
                </div> */}
                
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