import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, children }) {
  const logged = localStorage.getItem("weddingLoggedIn");
  if (!loggedIn && !logged) return <Navigate to={"/login"} />;

  return children;
}
