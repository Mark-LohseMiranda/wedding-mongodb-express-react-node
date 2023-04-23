import React, { useState } from "react";
import API from "../../API/API";

export const UpdateProfile = ({ userState, setUserState, setShowUpdate }) => {
  const [formState, setFormState] = useState({
    email: userState?.email,
    displayName: userState?.displayName,
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setErrorMsg("Passwords don't match");
    } else if (
      formState.password.length < 8 &&
      formState.password.length !== 0
    ) {
      setErrorMsg("Password needs to be a least 8 characters");
    } else {
      API.update(formState)
        .then((res) => {
          setUserState(res.data);
          localStorage.setItem("weddingData", JSON.stringify(res.data));
          setShowUpdate(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {/* <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-600/50 focus:outline-none"> */}
      <div class="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="relative z-10 float-right py-0 w-9 h-7">
          <button
            onClick={() => setShowUpdate(false)}
            className="inline-block rounded-full bg-danger text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
          >
            -=X=-
          </button>
        </div>
        <form
          className="z-10 max-w-sm p-1 mt-3 rounded-lg shadow-xl bg-slate-200/90"
          id="updateProfile"
          onSubmit={formSubmit}
        >
          <br />
          <label htmlFor="updateProfile" className="text-xl font-bold">
            Update Profile
          </label>

          <div
            className="relative flex items-stretch mb-4"
            data-te-input-wrapper-init
            data-te-input-group-ref
          >
            <span
              className="flex items-center whitespace-nowrap rounded-l border border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="emailspan"
              data-te-input-group-text-ref
            >
              @
            </span>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="email"
              name="email"
              aria-label="email"
              aria-describedby="emailspan"
              value={formState.email}
              onChange={handleFormChange}
              placeholder="Email"
              autoComplete="email"
              // defaultValue={userState.email}
            />
            <label
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              htmlFor="email"
            >
              New Email:
            </label>
          </div>
          <div className="mt-6 mb-3 form-floating">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="displayName"
              name="displayName"
              value={formState.displayName}
              onChange={handleFormChange}
              placeholder=""
              autoComplete="nickname"
              // defaultValue={userState.email}
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="email"
            >
              Display Name:
            </label>
          </div>
          <div className="mb-3 form-floating">
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
              placeholder=" "
              autoComplete="new-password"
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="password"
            >
              New Password:
            </label>
          </div>
          <div className="mb-3 form-floating ">
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="confirmPassword"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleFormChange}
              placeholder=" "
              autoComplete="new-password"
            />
            <label
              className="text-gray-700 dark:text-slate-300"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
          </div>
          <p>{errorMsg}</p>
          <div className="flex items-center justify-center p-6 rounded-b">
            <button
              type="submit"
              className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};
