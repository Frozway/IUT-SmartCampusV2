import './../styles/Header.css'
import {Outlet} from "react-router-dom"

const Header = () => {
  return (
    <>
    <div className="header">
      <div className="title-container">
        <h1 className="title">SmartCampus - Liste des salles</h1>
      </div>
    </div>
    <Outlet />
    </>
    
    
  )
}

export default Header
