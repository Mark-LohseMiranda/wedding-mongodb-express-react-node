import React, { useState, useEffect } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import CreateParty from "./CreateParty";
import UpdateParty from "./UpdateParty";

export default function Parties({
  userState,
  setUserState,
  weddingId,
  setWeddingId,
  partyId,
  setPartyId,
}) {
  const [wedding, setWedding] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  const selectParty = (e) => {
    setPartyId(e.target.getAttribute("data-id"));
    localStorage.setItem("partyId", e.target.getAttribute("data-id"));
    navigate("/guests");
  };

  const deleteParty = (e) => {
    if (
      window.confirm(
        "Are you sure you want to delete this party? It cannot be undone!"
      )
    ) {
      try {
        API.deleteParty(weddingId, e.target.getAttribute("data-id")).then(
          (res) => {
            localStorage.setItem("weddingData", JSON.stringify(res.data));
            setUserState(res.data);
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const updateParty = (e) => {
    setPartyId(e.target.getAttribute("data-id"));
    setShowUpdate(true);
  };

  useEffect(() => {
    try {
      const tempUserState = JSON.parse(localStorage.getItem("weddingData"));
      const tempWeddingId = localStorage.getItem("weddingId");
      const temp = tempUserState.weddings?.filter((item) => {
        return item._id === tempWeddingId;
      });
      setWedding(temp[0]);
    } catch (err) {
      console.log(err.message);
    }
  }, [navigate, userState, setWedding]);

  useEffect(()=>{
    const tempUserState = JSON.parse(localStorage.getItem("weddingData"));
      if (!tempUserState) navigate("/");
      setUserState(tempUserState);
  },[setUserState,navigate])

  useEffect(() => {
    const tempWeddingId = localStorage.getItem("weddingId");
    if (!tempWeddingId) navigate("/");
    setWeddingId(tempWeddingId);
  });

  return (
    <div>
      <div>
      <span
          onClick={() => {
            navigate("/weddings");
          }}
        >
          Home
        </span> {" >> "}
        {wedding?.name && wedding.name}
      </div>
      <div>
        <button
          onClick={() => {
            setShowAdd(true);
          }}
        >
          Add Party
        </button>
      </div>
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100">
        {wedding?.parties?.map((party) => {
          return (
            <div key={party._id}>
              <div>{party.name}</div>
              <div>
                <p>
                  Date Invite Sent:{" "}
                  {party.dateInviteSent
                    ? party.dateInviteSent.slice(0, 10)
                    : "None"}
                </p>
                <p>
                  Date RSVP Received :{" "}
                  {party.dateRSVPReceived
                    ? party.dateRSVPReceived.slice(0, 10)
                    : "None"}
                </p>
                <p>Address: {party.street1}</p>
                <p>{party.street2}</p>
                <p>
                  {party.city}, {party.state} {party.zipcode}
                </p>
                <p>{party.country}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <button
                    onClick={selectParty}
                    data-id={party._id}
                    className="hover:text-sky-200"
                  >
                    -=Select=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={updateParty}
                    data-id={party._id}
                    className="hover:text-sky-200"
                  >
                    -=Edit=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={deleteParty}
                    data-id={party._id}
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
          <CreateParty
            setUserState={setUserState}
            weddingId={weddingId}
            setShowAdd={setShowAdd}
          />
        )}
        {showUpdate && (
          <UpdateParty
            userState={userState}
            setUserState={setUserState}
            weddingId={weddingId}
            partyId={partyId}
            setShowUpdate={setShowUpdate}
          />
        )}
      </div>
    </div>
  );
}
