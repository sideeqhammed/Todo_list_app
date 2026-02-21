import { useState } from "react";
import Home from "./home";
import { useNavigate } from "react-router-dom";

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsername('')
    setEmail('')
    setPassword1('')
    setPassword2('')
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/todo/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password1, password2 })
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        navigate('/Home')
      } else {
        const errData = await response.json()
        setError(errData)
      }
    }
    catch (error) {
      setError(error.message)
  }
}

  return(
    <div className="flex flex-col h-100vh items-center justify-center gap-5">
      <div className="w-90 h-115 bg-gray-200 m-auto py-4 px-10 rounded-2xl text-center items-center justify-center">
        <h1 className="text-3xl mt-3 mb-7 font-extrabold">Create Account</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <label for="username" className="block text-left">Username</label>
            <input 
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            size={25}
            required
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-2"
            />
            <label for="email" className="block text-left">Email:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            size={25}
            required
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-2"
            />
            <label for="password1" className="block text-left">Password:</label>
            <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Password"
            size={25}
            required
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-2"
            />
            <label for="password2" className="block text-left">Confirm Password:</label>
            <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            size={25}
            required
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-10"
            />
            <button type="submit" className=" bg-gray-400 text-xl py-2 px-4 rounded-sm hover:scale-102">Create Account</button>
          </form>
        </div>
      </div>
      {error &&
        Object.entries(error).map(([field, messages]) => (
          <p key={field} className="bg-red-500 p-3 text-white rounded-lg">
            {messages[0]}
          </p>
        ))
      }
    </div>
  )
}

export default Register;