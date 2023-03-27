import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API/API";

export default function Navbar({ setUserState, loggedIn, setLoggedIn }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState("false");

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

  const login = () => {
    navigate("/login");
  };

  useEffect(() => {
    const logged = localStorage.getItem("weddingLoggedIn");
    if (logged) setLoggedIn(true);
  }, [setLoggedIn]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="py-1">
            {/* <Link to="/">
              <img
                className="w-20 h-20 rounded-lg hover:scale-105"
                src={logo}
                alt="cake-logo"
              />
            </Link> */}
          </div>
          <div className="items-center justify-end flex-1 hidden gap-6 sm:flex">
            {loggedIn && <Link to="/profile">Profile</Link>}
            {loggedIn && (
              <button
                className="p-1 m-3 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 drop-shadow-xl"
                onClick={logout}
              >
                Logout
              </button>
            )}
            {!loggedIn && <Link to="/login">Login</Link>}
            {!loggedIn && <Link to="/signup">Sign Up</Link>}
            {!loggedIn && <Link to="/about">About</Link>}
            <button
              className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 dark:text-slate-100 drop-shadow-xl"
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
            ></button>
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
                  {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
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
  );
}
