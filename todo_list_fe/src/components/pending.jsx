import { useEffect, useState } from "react"
import Tabs from "./tabs"
import Header from "./header"
import { fetchWithAuth } from "./refresh"

function Pending() {

  const [tasks, setTasks] = useState([])

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
  
  
  const pendings = tasks.filter(t => t.completed === false)
  return(
    <>
      <div className="bg-gray-200 mx-auto mt-10 md:w-2xl p-5 rounded-2xl">
        <h2 className="text-2xl">Pending Tasks</h2>

        <div className="bg-gray-300 my-2 p-3 rounded-lg">
          
          
          <ul className="">
            {pendings.map(pending => (
              <li key={pending.id} className="flex justify-between items-center flex-wrap bg-gray-200 mb-3 text-lg p-2 rounded-lg">
                <div className="flex gap-1">
                  <input 
                    type="checkbox"
                    checked={pending.completed}
                    onChange={() => {
                     
                    }}
                  />    
                  <div className="wrap-break-word max-w-72 md:max-w-70 pb-1">
                    {pending.title}    
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

export default Pending