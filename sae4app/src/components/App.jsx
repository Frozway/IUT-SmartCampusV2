import {Outlet} from "react-router-dom"
import './../styles/App.css'
import Header from "./Header"
import RoomList from "./RoomList"

import { useLocation } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />

      {useLocation().pathname === "/" && (
        <RoomList />
      )}

    </div>
  )
}

export default App