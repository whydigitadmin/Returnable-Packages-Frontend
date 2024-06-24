import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const userDetails = localStorage.getItem("userDetails");
  const modifiedUserDetails = userDetails.slice(5).toLowerCase();
  const initCapUserDetails =
    modifiedUserDetails.charAt(0).toUpperCase() + modifiedUserDetails.slice(1);
  const [loginUserDto, setLoginUserDto] = useState(
    JSON.parse(localStorage.getItem("userDto"))
  );
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  useEffect(() => {
    // themeChange(false);
    // if (currentTheme === null) {
    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches
    //   ) {
    //     setCurrentTheme("dark");
    //   } else {
    //     setCurrentTheme("light");
    //   }
    // }
    setCurrentTheme("light");
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/logout?userName=${userName}`,
          { headers }
        );
        if (response) {
          if (response.data.statusFlag === "Error") {
            toast.error(response.data.paramObjectsMap.errorMessage, {
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(response.data.paramObjectsMap.message, {
              autoClose: 2000,
              theme: "colored",
            });
            localStorage.clear();
            window.location.href = "/";
          }
        } else {
          console.error("API Error:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>

          {localStorage.getItem("userDetails") === "ROLE_EMITTER" && (
            <>
              <Link to={"/app/welcomeemitter"}>
                <img
                  src="/BIN_BEE.png"
                  style={{
                    width: "150px",
                    height: "auto",
                    marginLeft: "6px",
                  }}
                />
              </Link>
            </>
          )}
          {localStorage.getItem("userDetails") === "ROLE_OEM" && (
            <>
              <Link to={"/app/welcomeoem"}>
                <img
                  src="/BIN_BEE.png"
                  style={{
                    width: "150px",
                    height: "auto",
                    marginLeft: "6px",
                  }}
                />
              </Link>
            </>
          )}
          {localStorage.getItem("userDetails") === "ROLE_USER" && (
            <>
              <h1
                className="text-2xl font-semibold ml-2"
                // style={{ color: "rgb(51, 156, 109)" }}
              >
                {pageTitle}
              </h1>
            </>
          )}
          {localStorage.getItem("userDetails") === "ROLE_ADMIN" && (
            <>
              <h1
                className="text-2xl font-semibold ml-2"
                // style={{ color: "rgb(51, 156, 109)" }}
              >
                {pageTitle}
              </h1>
            </>
          )}
        </div>

        <div className="order-last">
          <p className="font-semibold me-2">
            <span>Welcome </span>
            <span className="text-uppercase">{loginUserDto.firstName}</span>
            <span className="text-uppercase ms-1">({initCapUserDetails})</span>
          </p>
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection,
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
            <option disabled selected>
              Theme
            </option>
            <option value="light">Default</option>
            <option value="dark">Dark</option>
          </select> */}

          {/* Light and dark theme selection toogle **/}
          {/* <label className="swap ">
            <input type="checkbox" />
            <SunIcon
              data-set-theme="light"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "dark" ? "swap-on" : "swap-off")
              }
            />
            <MoonIcon
              data-set-theme="dark"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "light" ? "swap-on" : "swap-off")
              }
            />
          </label> */}
          {localStorage.getItem("userDetails") === "ROLE_EMITTER" ||
          "ROLE_OEM" ? (
            ""
          ) : (
            <label>
              <img
                className="mask mask-squircle w-10"
                src="/AI_Packs.png"
                style={{
                  width: "50px",
                  height: "auto",
                  marginRight: "20px",
                }}
                alt="AI Packs org logo"
              />
              {/* AI Packs */}
            </label>
          )}

          {/* Notification icon */}
          <button
            className="btn btn-ghost ml-4  btn-circle"
            onClick={() => openNotification()}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {/* {noOfNotifications} */}1
                </span>
              ) : null}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* <img src="/logo192.png" alt="profile" /> */}
                <FaRegUserCircle className="w-10 h-10" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li className="justify-between">
                <Link to={"/app/settings-profile"}>
                  Company Profile
                </Link>
              </li>
              <li className="">
                <Link to={"/app/preferences"}>Preferences</Link>
              </li> */}

              {userDetails === "ROLE_ADMIN" && (
                <li className="">
                  <Link to={"/app/welcome"}>My Tasks</Link>
                </li>
              )}
              {userDetails === "ROLE_USER" && (
                <li className="">
                  <Link to={"/app/welcome"}>My Tasks</Link>
                </li>
              )}
              <li className="">
                <Link to={"/app/settings-profile"}>My Profile</Link>
              </li>
              <li className="">
                <Link to={"/app/changepwd"}>Change Password</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
