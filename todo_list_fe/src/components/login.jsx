import { useState } from "react";

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    setError(null)
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/todo/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      setLoading(true)
      if (response.ok) {
        setLoading(false)
        setSuccess('Success!')
        const data = await response.json()
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        window.location.href = "/"
      } else {
        setLoading(false)
        const errorData = await response.json()
        setError(errorData.detail || 'Login failed')
      }
    }

    catch (error) {
      console.log(error)
      setError(error.message)
  }
}

  return(
    <div className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="w-90 h-110 bg-gray-200 mx-auto py-4 px-10 rounded-2xl text-center">
        <h1 className="text-3xl mt-5 mb-10 font-extrabold">Login</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
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
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-5"
            />
            <label for="password" className="block text-left">Password:</label>
            <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            size={25}
            required
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-10"
            />
            <button type="submit" className=" bg-gray-400 text-xl py-2 px-4 mb-8 rounded-sm hover:scale-102">Login</button>
            <p className="mt-4">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a></p>
          </form>
        </div>
      </div>
      {loading && 
        <div className="w-80 bg-gray-500 p-3 text-white rounded-lg text-xl text-center">Loading...</div>
      }
      {error && 
        <div className="w-80 bg-red-500 p-3 text-white rounded-lg text-xl text-center">{error}</div>
      }
      {success && 
        <div className="w-80 bg-green-500 p-3 text-white rounded-lg text-xl text-center">{success}</div>
      }
    </div>
  )
}

export default Login;