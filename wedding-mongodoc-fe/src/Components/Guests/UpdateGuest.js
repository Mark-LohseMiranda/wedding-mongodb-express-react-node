import React, { useState, useEffect } from "react";
import API from "../../API/API";
import GuestForm from "./GuestForm";

export default function UpdateGuest({
  userState,
  setUserState,
  weddingId,
  partyId,
  guestId,
  setShowUpdate,
}) {
  const [formState, setFormState] = useState({
    name: "",
    meal: "",
    seat: "",
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
    API.updateGuest(weddingId, partyId, guestId, formState).then((res) => {
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
    const guestIndex = userState.weddings[weddingIndex].parties[
      partyIndex
    ].guests.findIndex((obj) => obj._id === guestId);
    setFormState({
      name: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].name
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].name
        : "",
      meal: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].meal
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].meal
        : "",
      seat: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].seat
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].seat
        : "",
      street1: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].street1
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].street1
        : "",
      street2: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].street2
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].street2
        : "",
      city: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].city
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].city
        : "",
      state: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].state
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].state
        : "",
      zipcode: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].zipcode
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].zipcode
        : "",
      country: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].country
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].country
        : "",
    });
  }, [setFormState, weddingId, partyId, guestId, userState.weddings]);
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
        <GuestForm
          formState={formState}
          handleFormChange={handleFormChange}
          formSubmit={formSubmit}
        />
      </div>
    </div>
  );
}
