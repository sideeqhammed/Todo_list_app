import { useState } from 'react'
import './App.css'
import Home from './components/home'
import Layout from './components/layout'
import Login from './components/login'
import Register from './components/register'
// import Pending from './components/pending'
// import Completed from './components/completed'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [filter, setFilter] = useState('')

  const isAuthenticated = () => {
    return (!!localStorage.getItem("access"))
  }

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route element={<Layout />}>
          <Route path='/' element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}></Route>
          {/* <Route path='/pending' element={isAuthenticated() ? <Pending /> : <Navigate to="/login" />}></Route> */}
          {/* <Route path='/completed' element={isAuthenticated() ? <Completed /> : <Navigate to="/login" />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
