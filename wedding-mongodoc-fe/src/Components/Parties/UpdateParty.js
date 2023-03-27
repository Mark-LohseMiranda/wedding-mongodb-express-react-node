import React, { useState, useEffect } from "react";
import API from "../../API/API";
import PartyForm from "./PartyForm";

export default function UpdateParty({
  userState,
  setUserState,
  weddingId,
  partyId,
  setShowUpdate,
}) {
  const [formState, setFormState] = useState({
    name: "",
    dateInviteSent: "",
    dateRSVPReceived: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    API.updateParty(weddingId, partyId, formState).then((res) => {
      setUserState(res.data);
      localStorage.setItem("weddingData", JSON.stringify(res.data));
      setShowUpdate(false);
    });
  };

  useEffect(() => {
    const weddingIndex = userState.weddings.findIndex(
      (obj) => obj._id === weddingId
    );
    const partyIndex = userState.weddings[weddingIndex].parties.findIndex(
      (obj) => obj._id === partyId
    );
    setFormState({
      name: userState.weddings[weddingIndex].parties[partyIndex].name
        ? userState.weddings[weddingIndex].parties[partyIndex].name
        : "",
      dateInviteSent: userState.weddings[weddingIndex].parties[partyIndex]
        .dateInviteSent
        ? userState.weddings[weddingIndex].parties[
            partyIndex
          ].dateInviteSent.slice(0, 10)
        : "",
      dateRSVPReceived: userState.weddings[weddingIndex].parties[partyIndex]
        .dateRSVPReceived
        ? userState.weddings[weddingIndex].parties[
            partyIndex
          ].dateRSVPReceived.slice(0, 10)
        : "",
      street1: userState.weddings[weddingIndex].parties[partyIndex].street1
        ? userState.weddings[weddingIndex].parties[partyIndex].street1
        : "",
      street2: userState.weddings[weddingIndex].parties[partyIndex].street2
        ? userState.weddings[weddingIndex].parties[partyIndex].street2
        : "",
      city: userState.weddings[weddingIndex].parties[partyIndex].city
        ? userState.weddings[weddingIndex].parties[partyIndex].city
        : "",
      state: userState.weddings[weddingIndex].parties[partyIndex].state
        ? userState.weddings[weddingIndex].parties[partyIndex].state
        : "",
      zipcode: userState.weddings[weddingIndex].parties[partyIndex].zipcode
        ? userState.weddings[weddingIndex].parties[partyIndex].zipcode
        : "",
      country: userState.weddings[weddingIndex].parties[partyIndex].country
        ? userState.weddings[weddingIndex].parties[partyIndex].country
        : "",
    });
  }, [setFormState, weddingId, partyId, userState.weddings]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-600/50 focus:outline-none">
      <div className="relative z-10 float-right w-6 h-6 py-0 hover:text-red">
        <button
          className="hover:text-red-500"
          onClick={() => setShowUpdate(false)}
        >
          X
        </button>
      </div>
      <div>
        <PartyForm
          formState={formState}
          handleFormChange={handleFormChange}
          formSubmit={formSubmit}
        />
      </div>
    </div>
  );
}
