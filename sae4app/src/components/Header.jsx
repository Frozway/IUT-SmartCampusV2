import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoomByTag } from "../services/roomService";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("Liste des salles");

  useEffect(() => {
    if (location.pathname.includes("room")) {
      const tag = location.pathname.split("/").pop();
      const tagNumber = parseInt(tag);
      fetchRoomByTag(tagNumber).then((room) => {
        setTitle(room.name);
      });
    }
  }, [location.pathname]);

  return (
    <>
      <div className="bg-green-dark text-white sticky top-0 z-20 drop-shadow-md">
        <h1 className="font-bold text-xl text-white p-4">
          SmartCampus - {title}
        </h1>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
