import { useState } from "react"

function Tabs() {

  const [active, setActive] = useState(0)

  return(
    <div>
      <div className="flex justify-center p-3">
        <div className="relative flex bg-white rounded-lg">
          <div 
            className="absolute top-1 bottom-1 w-1/3 bg-gray-300 rounded-md transition-transform duration-300"
            style={{transform: `translateX(${active * 100}%)`}}
          >
          </div>
          <button
            className="relative z-10 text-lg p-4 rounded-md"
            onClick={() => setActive(0)}
          >
            All Tasks
          </button>
          <button 
            className="relative z-10 text-lg p-4 rounded-md"
            onClick={() => setActive(1)}
          >
            Pending
          </button>
          {/* <button>Pending</button> */}
          <button 
            className="relative z-10 text-lg p-4 rounded-md"
            onClick={() => setActive(2)}
          >
            Completed
          </button>
        </div>
      </div>

    </div>
  )

}

export default Tabs