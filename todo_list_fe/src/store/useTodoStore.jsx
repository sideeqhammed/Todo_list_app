import { create } from "zustand"
import { fetchWithAuth } from "../components/refresh"
import { Navigate } from "react-router-dom"

const useTodoStore = create((set, get) => ({
  tasks: [],
  filter: 'all',
  setFilter: (filter) => set({ filter: filter}),
  taskInput: false,
  addTask: () => set({ taskInput: true }),
  taskText: '',
  setTaskText: (text) => set({ taskText: text }),
  editingId: null,
  toggleEditingId: (id) => set({ editingId: id }),
  editText: '',
  setEditText: (text) => set({editText: text}),
  taskToDelete: false,
  setTaskToDelete: (task) => set({ taskToDelete: task }),
  fetchTasks: async() => {
    try{
      const response = await fetchWithAuth("http://localhost:8000/todo/task/")
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      const tasks = await response.json()
      set({ tasks: tasks })
      console.log(tasks)
    } catch(err) {
      console.error(err)
    }
  },
  createTask: async(text) => {
    try {
      const response = await fetchWithAuth("http://localhost:8000/todo/task/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: text,
        }),
      })
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      const data = await response.json()
      console.log(data)
      if (data) {
        set((state) => ({
          tasks: [data, ...state.tasks]
        }))
        set({ taskText: '' })
      }
        console.log(response)
    } catch(err) {
      console.error(err)
    }
  },
  toggleTask: async(id) => {
    try {
      const { tasks } = get(); // get current state
      const task = tasks.find(task => task.id === id);
      if (!task) return;

      const response = await fetchWithAuth(`http://localhost:8000/todo/task/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      })
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      let toggledTask = await response.json()
      console.log(toggledTask)
      set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? toggledTask : task)
      }))
    } catch (err){
      console.error(err)
    }
  },
  editTask: (id, text) => {
    try{
      const { tasks, setEditText } = get()
      const task = tasks.find(t => t.id === id)
      if(!task) return

      setEditText(text)


    } catch (err) {
      console.error(err)
    }
  },
  updateTask: async(id, text) => {
    try{
      const { tasks } = get()
      const task = tasks.find(t => t.id === id)
      if(!task) return

      const response = await fetchWithAuth(`http://localhost:8000/todo/task/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: text
        })
      })
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      const updatedTask = await response.json()
      console.log(updatedTask)
      set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? updatedTask : task)
      }))
    } catch (err) {
      console.error(err)
    }
  },
  deleteTask: async(id) => {
    try{
      const { tasks } = get()
      const task = tasks.find(t => t.id === id);
      if(!task) return

      const response = await fetchWithAuth(`http://localhost:8000/todo/task/${id}/`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!response.ok) {
        console.log("Failed:", response.status);
        return;
      }
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  },
}))

export default useTodoStore