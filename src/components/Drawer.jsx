import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const routes = [
  { url: "/courses", name: "Cursos", icon: "bi bi-layers" },
  { url: "/students", name: "Estudiantes", icon: "bi bi-person" },
  { url: "/professors", name: "Profesores", icon: "bi bi-person-video3" },
  {
    url: "/documentation",
    name: "Documentación",
    icon: "bi bi-book",
  },
];

const Drawer = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#252630] h-screen">
      <div className="px-auto max-w-xs p-14 mt-10">
        <img src={logo} alt="" className="w-auto mx-auto" />
      </div>
      <ul className="menu p-4 overflow-y-auto w-64 text-base-100 space-y-2">
        {routes.map((route) => (
          <li
            key={route.url}
            className={"w-full hover:bg-white/10 rounded-md "}
          >
            <Link to={route.url}>
              <div className="flex space-x-4 text-md">
                <i className={route.icon}></i>
                <p>{route.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-end justify-center h-52 p-2">
        <button className="btn btn-sm w-full h-10 m-4 normal-case">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Drawer;
