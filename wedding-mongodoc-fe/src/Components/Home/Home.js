import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/API";

export default function Home({
  userState,
  setUserState,
  loggedIn,
  setLoggedIn,
}) {
  const navigate = useNavigate();

  const getMe = () => {
    API.me().then((res) => {
      console.log(res.data);
    });
  };



  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
