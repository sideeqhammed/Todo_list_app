import { useEffect, useState } from "react"
import { fetchWithAuth } from "./refresh"
import useTodoStore from "../store/useTodoStore"

function Home() {

  const {
    tasks,
    fetchTasks,
    createTask,
    toggleTask,
    taskInput,
    addTask,
    taskText,
    setTaskText,
    filter,
    editText,
    setEditText,
    editingId,
    toggleEditingId,
    editTask,
    updateTask,
    taskToDelete,
    setTaskToDelete,
    deleteTask
  } = useTodoStore()

  
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
              <textarea 
                name="text" 
                value={taskText} 
                rows={2}
                cols={30}
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

                  {editingId === task.id ? 
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => {setEditText(e.target.value); console.log(editText)}}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateTask(task.id, editText);
                        } else if (e.key === "Escape") {
                          toggleEditingId(null);
                        }
                      }}
                      className="border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none"
                    />
                    :
                    <div style={{textDecoration: task.completed ? 'line-through' : 'none'}} className="wrap-break-word max-w-72 md:max-w-70 pb-1">
                      {task.title}
                    </div>
                  }
                  
                </div>
                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      if (editingId !== task.id) {
                        editTask(task.id, task.title);
                        toggleEditingId(task.id);
                      } else {
                        if (editText !== task.title) {
                          updateTask(task.id, editText);
                          console.log("not updated");
                        }
                          toggleEditingId(null);
                      }
                    }}
                    className=" bg-gray-400 py-1 px-2 rounded-sm hover:scale-105"
                  >{editingId === task.id ? '✔️ Done' : '✏️ Edit'}</button>

                  <button 
                    onClick={() => {
                      setTaskToDelete(true)
                    }} className=" bg-red-700 py-1 px-2 rounded-sm hover:scale-105">🗑️ Delete</button>

                    {taskToDelete && (
                        <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-sm flex items-center justify-center z-20">
                          <div className="bg-white p-4 rounded-lg">
                            <p>Are you sure you want to delete this task?</p>

                            <div className="flex justify-between mt-4">
                              <button
                                onClick={() => {
                                  deleteTask(task.id);
                                  setTaskToDelete(null);
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Yes, Delete
                              </button>

                              <button
                                onClick={() => setTaskToDelete(null)}
                                className="bg-gray-300 px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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