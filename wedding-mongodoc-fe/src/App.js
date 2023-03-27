import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Weddings from "./Components/Weddings/Weddings";
import Navbar from "./Components/Navbar/Navbar";
import Parties from "./Components/Parties/Parties";
import Guests from "./Components/Guests/Guests";
import Gifts from "./Components/Gifts/Gifts"
import ProtectedRoute from "./Util/ProtectedRoute";

function App() {
  const [userState, setUserState] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [weddingId, setWeddingId] = useState();
  const [partyId, setPartyId] = useState();
  const [guestId, setGuestId] = useState();
  const [giftId, setGiftId] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          setUserState={setUserState}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
        <Route
            path="/gifts"
            element={
              <ProtectedRoute
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              >
                <Gifts
                  userState={userState}
                  setUserState={setUserState}
                  weddingId={weddingId}
                  setWeddingId={setWeddingId}
                  partyId={partyId}
                  setPartyId={setPartyId}
                  guestId={guestId}
                  setGuestId={setGuestId}
                  giftId={giftId}
                  setGiftId={setGiftId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guests"
            element={
              <ProtectedRoute
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              >
                <Guests
                  userState={userState}
                  setUserState={setUserState}
                  weddingId={weddingId}
                  setWeddingId={setWeddingId}
                  partyId={partyId}
                  setPartyId={setPartyId}
                  guestId={guestId}
                  setGuestId={setGuestId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parties"
            element={
              <ProtectedRoute
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              >
                <Parties
                  userState={userState}
                  setUserState={setUserState}
                  weddingId={weddingId}
                  setWeddingId={setWeddingId}
                  partyId={partyId}
                  setPartyId={setPartyId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings"
            element={
              <ProtectedRoute
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              >
                <Weddings
                  userState={userState}
                  setUserState={setUserState}
                  weddingId={weddingId}
                  setWeddingId={setWeddingId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                userState={userState}
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                userState={userState}
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="*"
            element={
              <Home
                userState={userState}
                setUserState={setUserState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
