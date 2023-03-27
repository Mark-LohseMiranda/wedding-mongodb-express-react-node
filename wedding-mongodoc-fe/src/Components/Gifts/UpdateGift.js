import React, { useState, useEffect } from "react";
import API from "../../API/API";
import GiftForm from "./GiftForm";

export default function UpdateGift({
  userState,
  setUserState,
  weddingId,
  partyId,
  guestId,
  giftId,
  setShowUpdate,
}) {
  const [formState, setFormState] = useState({
    item: "",
    dateThankYouSent: "",
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
    API.updateGift(weddingId, partyId, guestId, giftId, formState).then(
      (res) => {
        setUserState(res.data);
        localStorage.setItem("weddingData", JSON.stringify(res.data));
        setShowUpdate(false);
      }
    );
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
    const giftIndex = userState.weddings[weddingIndex].parties[
      partyIndex
    ].guests[guestIndex].gifts.findIndex((obj) => obj._id === giftId);

    setFormState({
      item: userState.weddings[weddingIndex].parties[partyIndex].guests[
        guestIndex
      ].gifts[giftIndex].item
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].gifts[giftIndex].item
        : "",
      dateThankYouSent: userState.weddings[weddingIndex].parties[partyIndex]
        .guests[guestIndex].gifts[giftIndex].dateThankYouSent
        ? userState.weddings[weddingIndex].parties[partyIndex].guests[
            guestIndex
          ].gifts[giftIndex].dateThankYouSent.slice(0, 10)
        : "",
    });
  }, [setFormState, weddingId, partyId, guestId, giftId, userState.weddings]);

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
        <GiftForm
          formState={formState}
          handleFormChange={handleFormChange}
          formSubmit={formSubmit}
        />
      </div>
    </div>
  );
}
