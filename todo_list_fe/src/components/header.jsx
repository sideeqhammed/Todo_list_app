import { useState, useEffect } from "react";
import { fetchWithAuth } from "./refresh";

function Header() {
  const [username, setUsername] = useState('')

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
    <div className="flex justify-between bg-gray-400 items-center mb-8">
      <h1 className="p-5 text-2xl md:text-4xl flex justify-center ">My ToDo List</h1>
      <p className="p-5 text-lg md:text-xl text-center">Hello {username}</p>
    </div>
  )
}

export default Header