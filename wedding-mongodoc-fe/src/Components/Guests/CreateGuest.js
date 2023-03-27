import React, { useState } from "react";
import API from "../../API/API";
import GuestForm from "./GuestForm";

export default function CreateGuest({
  setUserState,
  weddingId,
  partyId,
  setShowAdd,
}) {
  const [formState, setFormState] = useState({
    name: "",
    meal: "",
    seat: "",
    addressSameAsParty: false,
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "sameAddress") {
      setFormState({
        ...formState,
        addressSameAsParty: !formState.addressSameAsParty,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    API.createGuest(weddingId, partyId, formState).then((res) => {
      setUserState(res.data);
      localStorage.setItem("weddingData", JSON.stringify(res.data));
      setShowAdd(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-600/50 focus:outline-none">
      <div className="relative z-10 float-right w-6 h-6 py-0 hover:text-red">
        <button
          className="hover:text-red-500"
          onClick={() => setShowAdd(false)}
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
