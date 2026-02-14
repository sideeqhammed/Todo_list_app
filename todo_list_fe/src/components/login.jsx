import { useState } from "react";

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 h-86 bg-gray-200 m-auto py-4 px-10 rounded-2xl text-center items-center justify-center">
        <h1 className="text-3xl mb-10 font-extrabold">Login</h1>
        <div className="flex justify-center">
          <form>
            <label for="email" className="block text-left">Email:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            className="border-gray-500 border-2 py-1 px-2 rounded-md hover:scale-101 focus:border-gray-600 focus:outline-none mb-10"
            />
            <button className=" bg-gray-400 text-xl py-2 px-4 rounded-sm hover:scale-102">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;