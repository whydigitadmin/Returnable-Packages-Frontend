import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import routes from "../routes/sidebar";
import SidebarSubmenu from "./SidebarSubmenu";

function LeftSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const close = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`drawer-side ${isSidebarOpen ? "open" : ""}`}>
      <label
        htmlFor="left-sidebar-drawer"
        className="drawer-overlay"
        onClick={close}
      ></label>
      <ul className="menu pt-2 w-64 bg-base-100 text-base-content">
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={toggleSidebar}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="">
          {/* <Link to={"/app/welcome"}>
            <img
              className="mask mask-squircle w-10"
              src="/AI_Packs.png"
              alt="AI Packs org logo"
            />
            AI Packs
          </Link> */}
          <img
            src="/BIN_BEE.png"
            style={{
              width: "200px",
              height: "auto",
              marginLeft: "6px",
            }}
          />
        </li>
        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-semibold  bg-base-200 " : "font-normal"
                    }`
                  }
                  onClick={close} // Close sidebar on NavLink click
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
