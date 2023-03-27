import React, { useState, useEffect } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import CreateGuest from "./CreateGuest";
import UpdateGuest from "./UpdateGuest";

export default function Guests({
  userState,
  setUserState,
  weddingId,
  setWeddingId,
  partyId,
  setPartyId,
  guestId,
  setGuestId,
}) {
  const [wedding, setWedding] = useState();
  const [party, setParty] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  const selectGuest = (e) => {
    setGuestId(e.target.getAttribute("data-id"));
    localStorage.setItem("guestId", e.target.getAttribute("data-id"));
    navigate("/gifts");
  };
  const deleteGuest = (e) => {
    if (
      window.confirm(
        "Are you sure you want to delete this guest? It cannot be undone!"
      )
    ) {
      try {
        API.deleteGuest(
          weddingId,
          partyId,
          e.target.getAttribute("data-id")
        ).then((res) => {
          localStorage.setItem("weddingData", JSON.stringify(res.data));
          setUserState(res.data);
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const updateGuest = (e) => {
    setGuestId(e.target.getAttribute("data-id"));
    setShowUpdate(true);
  };

  useEffect(() => {
    try {
      const tempUserState = JSON.parse(localStorage.getItem("weddingData"));
      const tempWeddingId = localStorage.getItem("weddingId");
      const tempPartyId = localStorage.getItem("partyId");
      const tempWedding = tempUserState.weddings?.filter((item) => {
        return item._id === tempWeddingId;
      });
      const tempParty = tempWedding[0].parties?.filter((item) => {
        return item._id === tempPartyId;
      });
      setWedding(tempWedding[0]);
      setParty(tempParty[0]);
    } catch (err) {
      console.log(err.message);
    }
  }, [navigate, userState, setWedding, setParty]);

  useEffect(() => {
    const tempUserState = JSON.parse(localStorage.getItem("weddingData"));
    if (!tempUserState) navigate("/");
    setUserState(tempUserState);
  }, [setUserState, navigate]);

  useEffect(() => {
    const tempWeddingId = localStorage.getItem("weddingId");
    if (!tempWeddingId) navigate("/");
    setWeddingId(tempWeddingId);
  });

  useEffect(() => {
    const tempPartyId = localStorage.getItem("partyId");
    if (!tempPartyId) navigate("/weddings");
    setPartyId(tempPartyId);
  });

  return (
    <div>
      <div>
        <span
          onClick={() => {
            navigate("/parties");
          }}
        >
          {wedding?.name && wedding.name}
        </span> {" >> "}
        {party?.name && party.name}
      </div>
      <div>
        <button
          onClick={() => {
            setShowAdd(true);
          }}
        >
          Add Guest
        </button>
      </div>
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100">
        {party?.guests?.map((guest) => {
          return (
            <div key={guest._id}>
              <div>{guest.name}</div>
              <div>
                <p>Meal: {guest.meal}</p>
                <p>Seat: {guest.seat}</p>
              </div>
              <div>
                <p>Address: {guest.street1}</p>
                <p>{guest.street2}</p>
                <p>
                  {guest.city}, {guest.state} {guest.zipcode}
                </p>
                <p>{guest.country}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <button
                    onClick={selectGuest}
                    data-id={guest._id}
                    className="hover:text-sky-200"
                  >
                    -=Select=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={updateGuest}
                    data-id={guest._id}
                    className="hover:text-sky-200"
                  >
                    -=Edit=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={deleteGuest}
                    data-id={guest._id}
                    className="hover:text-red-500"
                  >
                    -=Delete=-
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {showAdd && (
          <CreateGuest
            setUserState={setUserState}
            weddingId={weddingId}
            partyId={partyId}
            setShowAdd={setShowAdd}
          />
        )}
        {showUpdate && (
          <UpdateGuest
            userState={userState}
            setUserState={setUserState}
            weddingId={weddingId}
            partyId={partyId}
            guestId={guestId}
            setShowUpdate={setShowUpdate}
          />
        )}
      </div>
    </div>
  );
}
