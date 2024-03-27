import {Outlet} from "react-router-dom"

const Header = () => {
  return (
    <>
    <div className="bg-green-dark text-white sticky top-0 z-20 drop-shadow-md">
      <h1 className="font-medium text-white text-l p-2">SmartCampus - Liste des salles</h1>
    </div>

    <Outlet />
    </>
    
    
  )
}

export default Header
