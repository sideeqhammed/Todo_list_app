import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home'
import Header from './components/header'
import Login from './components/login'
import Register from './components/register'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  const isAuthenticated = () => {
    return (!!localStorage.getItem("access"))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
