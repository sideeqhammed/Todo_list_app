import { useState, useEffect } from "react";
import { fetchWithAuth } from "./refresh";
import { useNavigate } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear("access");
    localStorage.clear("refresh");
    navigate("/login")
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:8000/todo/profile/");
        if (!response.ok) {
          console.log("Failed:", response.status);
          return;
        }

        const data = await response.json();
        setUsername(data.username);
        console.log(data.username);
      } catch (err) {
        console.error("Error:", err)
        return null
      }
    };

    fetchData();
  }, []);

  return(
    <div className="flex justify-between px-5 bg-gray-400 items-center mb-8">
      <h1 className="p-5 text-2xl md:text-4xl flex justify-center ">My ToDo List</h1>
      <div className="flex">
        <p className="px-2 text-lg md:text-xl text-center">Hello {username}</p>
        <p className="pl-1 pr-3">|</p>
        <button className="px-2 bg-red-500 text-lg hover:scale-103 rounded-lg cursor-pointer" onClick={logout}>Logout <img src="src/assets/icons8-logout-48.png" className="inline-block w-5"/></button> 
      </div>
    </div>
  )
} 
<a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by Afian Rochmah Afif - Flaticon</a>
export default Header