import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoomByTag } from "../services/roomService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faHouse,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Accueil");
    } else if (location.pathname.includes("room")) {
      const tag = location.pathname.split("/").pop();
      const tagNumber = parseInt(tag);
      fetchRoomByTag(tagNumber).then((room) => {
        setTitle(room.name);
      });
    } else if (location.pathname === "/staff") {
      setTitle("Personnel");
    }
  }, [location.pathname]);

  let content;
  if (location.pathname === "/") {
    content = (
      <Link to={`/staff`}>
        <FontAwesomeIcon icon={faCircleUser} className="size-7 p-4" />
      </Link>
    );
  } else {
    if (isLoggedIn === "true") {
      content = (
        <Link to={`/`} onClick={() => localStorage.removeItem("isLoggedIn")}>
          <FontAwesomeIcon icon={faSignOut} className="size-7 p-4" />
        </Link>
      );
    } else {
      content = (
        <Link to={`/`}>
          <FontAwesomeIcon icon={faHouse} className="size-7 p-4" />
        </Link>
      );
    }
  }

  return (
    <>
      <div className="flex justify-between bg-green-dark text-white sticky top-0 z-20 drop-shadow-md">
        <h1 className="font-bold text-xl text-white p-4">
          SmartCampus - {title}
        </h1>
        {content}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
