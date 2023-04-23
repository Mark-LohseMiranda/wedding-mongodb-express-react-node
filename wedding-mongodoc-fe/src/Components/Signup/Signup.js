import React, { useState } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUserState }) {
  const [errorMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });

  // listens for form changes

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  // verifies password matches and is at least 8 characters
  // if user email already exists display error
  // if account is successfully created, populate userState with user info
  // and navigate to profile page.

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupFormState.password !== signupFormState.confirmPassword) {
      setErrorMsg("Passwords don't match");
    } else if (signupFormState.password.length < 8) {
      setErrorMsg("Password needs to be a least 8 characters");
    } else {
      API.signup(signupFormState)
        .then((res) => {
          setUserState(res.data);
          localStorage.setItem("weddingData", JSON.stringify(res.data));
          navigate("/weddings");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="z-10 p-2 rounded-lg shadow-xl bg-slate-200/50"
        id="signup-form"
        onSubmit={handleSignupSubmit}
      >
        <h4>Signup</h4>
        <div className="mb-3 form-floating xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="displayName"
            value={signupFormState.displayName}
            name="displayName"
            onChange={handleSignupChange}
            placeholder="Display Name"
            autoComplete="nickname"
          />
          <label
            htmlFor="displayName"
            className="text-gray-700 dark:text-slate-300"
          >
            First Name
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email-signup"
            value={signupFormState.email}
            name="email"
            onChange={handleSignupChange}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <label
            htmlFor="email-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Email
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="password-signup"
            value={signupFormState.password}
            name="password"
            onChange={handleSignupChange}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <label
            htmlFor="password-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Password
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="confirmPassword-signup"
            value={signupFormState.confirmPassword}
            name="confirmPassword"
            onChange={handleSignupChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <label
            htmlFor="confirmPassword-signup"
            className="text-gray-700 dark:text-slate-300"
          >
            Confirm Password
          </label>
        </div>
        <p>{errorMsg}</p>
        <button
          disabled={
            !signupFormState.email ||
            !signupFormState.displayName ||
            !signupFormState.password ||
            !signupFormState.confirmPassword
          }
          className="p-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
          id="signup-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
