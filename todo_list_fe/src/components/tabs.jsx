import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useTodoStore from "../store/useTodoStore"

function Tabs() {
  const filter = useTodoStore(state => state.filter)
  const setFilter = useTodoStore(state => state.setFilter)

  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  const clickAll = () => {
    setFilter('all')
    setActive(0)
    // navigate("/")
  }
  
  const clickPending = () => {
    setFilter('pending')
    setActive(1)
    // navigate("/pending")
  }

  const clickCompleted = () => {
    setFilter('completed')
    setActive(2)
    // navigate("/completed")
  }

  return(
    <div>
      <div className="flex justify-center p-3">
        <div className="relative grid grid-cols-3 bg-white rounded-lg p-1">
          <div 
            className="absolute top-1 bottom-1 w-1/3 bg-gray-300 rounded-md transition-transform duration-300"
            style={{transform: `translateX(${active * 100}%)`}}
          >
          </div>
          <button
            className="relative z-10 text-sm sm:text-lg p-4 rounded-md "
            onClick={() => clickAll()}
          >
            All Tasks
          </button>

          <button 
            className="relative z-10 text-sm sm:text-lg p-4 rounded-md"
            onClick={() => clickPending()}
          >
            Pending
          </button>
          
          <button 
            className="relative z-10 text-sm sm:text-lg p-4 rounded-md"
            onClick={() => clickCompleted()}
          >
            Completed
          </button>
        </div>
      </div>

    </div>
  )

}

export default Tabs