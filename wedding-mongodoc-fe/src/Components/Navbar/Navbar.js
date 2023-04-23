import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FORMAT from "../Format/Format";
// import { ReactComponent as Logo } from "../../Resources/Images/two-wedding-rings-svgrepo-com.svg";
import { FiMenu } from "react-icons/fi";
import {CgDarkMode} from "react-icons/cg";



import API from "../../API/API";

export default function Navbar({ setUserState, loggedIn, setLoggedIn }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const logo = require('../../Resources/Images/rings.png')

  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const logout = () => {
    API.logout().then((res) => {
      setUserState();
      setLoggedIn(false);
      navigate("/");
      localStorage.removeItem("weddingData");
      localStorage.removeItem("weddingId");
      localStorage.removeItem("weddingLoggedIn");
      localStorage.removeItem("partyId");
      localStorage.removeItem("guestId");
    });
  };

  useEffect(() => {
    const logged = localStorage.getItem("weddingLoggedIn");
    if (logged) setLoggedIn(true);
  }, [setLoggedIn]);

  return (
    <header className="py-2 border-b border-gray-300 dark:bg-gray-700">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <img id="logo" src={logo} alt="Logo"/> {/* size css in index.css */}
        <FiMenu
          className="block w-6 h-6 cursor-pointer md:hidden dark:text-gray-400"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <nav
          className={`w-full md:flex md:items-center md:w-auto ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="text-base text-gray-600 md:flex md:justify-between">
            <li>
              <Link
                className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                to="/"
              >
                Home
              </Link>
            </li>
            {loggedIn && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/weddings"
                >
                  Weddings
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {loggedIn && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            )}
            {loggedIn && (
              <li>
                <a
                className="block py-2 font-semibold text-red-500 md:px-5 hover:text-blue-700"
                onClick={logout}
                >
                Logout
              </a>
              </li>
            )}
            <li className="py-2 md:pt-2">
              <CgDarkMode className="block w-6 h-6 cursor-pointer dark:text-gray-400" onClick={toggleTheme}/>
            </li>
           
          </ul>
        </nav>
      </div>
    </header>

    /*
<>
      <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="py-1">

          </div>
          <div className="items-center justify-end flex-1 hidden gap-6 sm:flex">
            <Link to="/">Home</Link>
            {loggedIn && (
              <button
                data-te-ripple-init="true"
                data-te-ripple-color="light"
                className={FORMAT.button()}
              >
                <Link to="/profile">Profile</Link>
              </button>
            )}
            {loggedIn && (
              <button
                data-te-ripple-init="true"
                data-te-ripple-color="light"
                className={FORMAT.button()}
                onClick={logout}
              >
                Logout
              </button>
            )}
            {!loggedIn && <Link to="/login">Login</Link>}
            {!loggedIn && <Link to="/signup">Sign Up</Link>}
            {!loggedIn && <Link to="/about">About</Link>}
            <button
              data-te-ripple-init="true"
              data-te-ripple-color="light"
              className={FORMAT.button()}
              onClick={toggleTheme}
            >
              {" "}
              Toggle Theme{" "}
            </button>
          </div>
          <div className="flex flex-col items-end flex-1 sm:hidden">
            <button
              className="text-2xl fas fa-bars "
              onClick={() => {
                setIsOpen(true);
              }}
            >
              {""}
            </button>
            {isOpen === true && (
              <div
                className="fixed top-0 bottom-0 left-0 right-0 w-full h-full"
                onClick={() => {
                  setIsOpen(false);
                }}
              ></div>
            )}
            {isOpen === true && (
              <div
                className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <div className="py-1" role="none">
                  {loggedIn && (
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Profile
                    </Link>
                  )}
                  {loggedIn && (
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      About
                    </Link>
                  )}
                  {!loggedIn && (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Login
                    </Link>
                  )}
                  {!loggedIn && (
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      Signup
                    </Link>
                  )}
                  {loggedIn && (
                    <button
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
    */
  );
}
