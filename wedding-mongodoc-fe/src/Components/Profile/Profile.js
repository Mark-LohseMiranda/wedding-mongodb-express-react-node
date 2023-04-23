import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Modal, Ripple, initTE } from "tw-elements";
import FORMAT from "../Format/Format";
import API from "../../API/API";

export default function Profile({ userState, setUserState, setLoggedIn }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const [emailUpdateButton, setEmailUpdateButton] = useState(true);
  const [displayNameUpdateButton, setDisplayNameUpdateButton] = useState(true);
  const [passwordUpdateButton, setPasswordUpdateButton] = useState(true);

  const [errorMsg1, setErrorMsg1] = useState();
  const [errorMsg2, setErrorMsg2] = useState();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormState({
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const update = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailUpdateButton(true);
        break;
      case "displayName":
        setDisplayNameUpdateButton(true);
        break;
      case "password":
        setFormState({ ...formState, password: "", confirmPassword: "" });
        setPasswordUpdateButton(true);
    }
    API.update({ [e.target.name]: formState[e.target.name] })
      .then((res) => {
        setUserState(res.data);
        localStorage.setItem("weddingData", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAccount = async () => {
    // await API.delete();
    navigate("/");
    // setUserState();
    // setLoggedIn(false);
    // localStorage.removeItem("weddingData");
    // localStorage.removeItem("weddingId");
    // localStorage.removeItem("weddingLoggedIn");
    // localStorage.removeItem("partyId");
    // localStorage.removeItem("guestId");
  };

  useEffect(() => {
    initTE({ Input, Modal, Ripple }, true);
  }, []);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("weddingData"));
    if (!info) navigate("/");
    setUserState(info);
  }, [setUserState, navigate]);

  useEffect(() => {
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i.test(formState.email) ||
      formState.email === userState.email
    ) {
      setEmailUpdateButton(true);
    } else {
      setEmailUpdateButton(false);
    }
    if (
      formState.displayName === userState?.displayName ||
      !formState.displayName
    ) {
      setDisplayNameUpdateButton(true);
    } else {
      setDisplayNameUpdateButton(false);
    }
    if (formState.password === formState.confirmPassword) {
      setErrorMsg1("");
      setPasswordUpdateButton(false);
    } else {
      setErrorMsg1("Passwords don't match");
      setPasswordUpdateButton(true);
    }
    if (formState.password.length >= 8) {
      setErrorMsg2("");
    } else {
      setErrorMsg2("Password needs to be at least 8 characters");
      setPasswordUpdateButton(true);
    }

    if (!formState.password && !formState.confirmPassword) {
      setErrorMsg2("");
      setPasswordUpdateButton(true);
    }
  }, [
    formState.displayName,
    formState.email,
    userState?.displayName,
    formState.confirmPassword,
    formState.password,
  ]);

  return (
    <div className="flex flex-wrap justify-center gap-5 m-5">
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100">
        <div>Email: {userState?.email}</div>
        <div>Name: {userState?.displayName}</div>
        <div className="text-center">
          <button
            type="button"
            className={FORMAT.button("primary")}
            data-te-toggle="modal"
            data-te-target="#updateModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              setFormState({
                ...formState,
                email: userState?.email,
                displayName: userState?.displayName,
              });
            }}
          >
            Update Information
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            className={FORMAT.button("danger")}
            // data-te-toggle="modal"
            // data-te-target="#updateModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              deleteAccount();
            }}
          >
            Delete Account
          </button>
        </div>
        {/* Modal */}
        <div
          data-te-modal-init
          className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="updateModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-te-backdrop="static"
        >
          <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
          >
            <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className="flex items-center justify-between flex-shrink-0 p-4 border-b-2 border-opacity-100 rounded-t-md border-neutral-100 dark:border-opacity-50">
                {/* <!--Modal title--> */}
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalLabel"
                >
                  Update Information
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content border-none rounded-none hover:text-red-500 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* <!--Modal body--> */}
              <div className="relative flex-auto p-4" data-te-modal-body-ref>
                {/* Email */}
                <div
                  className="relative flex items-stretch mb-3"
                  data-te-input-wrapper-init
                  data-te-input-group-ref
                >
                  <input
                    type="email"
                    className={FORMAT.input()}
                    id="email"
                    placeholder="Email"
                    aria-describedby="emailSpan"
                    autoComplete="email"
                    onChange={handleFormChange}
                    name="email"
                    value={formState.email}
                  />
                  <label htmlFor="email" className={FORMAT.inputLabel()}>
                    Email
                  </label>
                  <span className={FORMAT.spanBlock()} id="emailSpan">
                    <button
                      disabled={emailUpdateButton}
                      onClick={update}
                      type="button"
                      name="email"
                      className={FORMAT.button()}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Update
                    </button>
                  </span>
                </div>

                {/* DisplayName */}
                <div
                  className="relative flex items-stretch mb-3"
                  data-te-input-wrapper-init
                  data-te-input-group-ref
                >
                  <input
                    type="displayName"
                    className={FORMAT.input()}
                    id="displayName"
                    placeholder="displayName"
                    aria-describedby="displayNameSpan"
                    autoComplete="displayName"
                    onChange={handleFormChange}
                    name="displayName"
                    value={formState.displayName}
                  />
                  <label htmlFor="displayName" className={FORMAT.inputLabel()}>
                    Display Name
                  </label>
                  <span className={FORMAT.spanBlock()} id="displayNameSpan">
                    <button
                      disabled={displayNameUpdateButton}
                      onClick={update}
                      type="button"
                      name="displayName"
                      className={FORMAT.button()}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Update
                    </button>
                  </span>
                </div>
                {/* Password */}
                <div
                  className="relative flex items-stretch mb-3"
                  data-te-input-wrapper-init
                  data-te-input-group-ref
                >
                  <input
                    type="password"
                    className={FORMAT.input()}
                    id="password"
                    placeholder="password"
                    aria-describedby="passwordSpan"
                    autoComplete="password"
                    onChange={handleFormChange}
                    name="password"
                    value={formState.password}
                  />
                  <label htmlFor="password" className={FORMAT.inputLabel()}>
                    Password
                  </label>
                  <span className={FORMAT.spanBlock()} id="passwordSpan">
                    <button
                      disabled
                      type="button"
                      className={`invisible ${FORMAT.button()}`}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Update
                    </button>
                  </span>
                </div>
                {/* Confirm Password */}
                <div
                  className="relative flex items-stretch mb-3"
                  data-te-input-wrapper-init
                  data-te-input-group-ref
                >
                  <input
                    type="password"
                    className={FORMAT.input()}
                    id="confirmPassword"
                    placeholder="confirmPassword"
                    aria-describedby="confirmPasswordSpan"
                    autoComplete="confirmPassword"
                    onChange={handleFormChange}
                    name="confirmPassword"
                    value={formState.confirmPassword}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={FORMAT.inputLabel()}
                  >
                    Confirm Password
                  </label>
                  <span className={FORMAT.spanBlock()} id="confirmPasswordSpan">
                    <button
                      onClick={update}
                      disabled={passwordUpdateButton}
                      type="button"
                      name="password"
                      className={FORMAT.button()}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Update
                    </button>
                  </span>
                </div>
                <div className="text-center text-red-500">
                  {errorMsg1} <br />
                  {errorMsg2}
                </div>
              </div>

              {/* <!--Modal footer--> */}
              <div className="flex flex-wrap items-center justify-center flex-shrink-0 p-4 border-t-2 border-opacity-100 rounded-b-md border-neutral-100 dark:border-opacity-50">
                <button
                  type="button"
                  className={FORMAT.button()}
                  data-te-modal-dismiss
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  Close
                </button>
                <button
                  onClick={resetForm}
                  // onClick={()=>{console.log(...FORMAT.testButton())}}
                  type="button"
                  // {...FORMAT.testButton()}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className={`${FORMAT.button()}`}
                  // className="bg-warning"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
