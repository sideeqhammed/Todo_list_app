import { Outlet } from "react-router-dom"
import Header from "./header"
import Tabs from "./tabs"

function Layout() {
  return(
    <>
      <Header />
      <div className="bg-gray-200 mx-auto md:w-2xl p-5 rounded-2xl">
        <Tabs />
      </div>
      <Outlet />
    </>
  )
}

export default Layout
