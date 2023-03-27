import React from "react";

export default function GuestForm({ formState, handleFormChange, formSubmit }) {
  return (
    <div>
      <form id="guestForm" onSubmit={formSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="meal"
            name="meal"
            value={formState.meal}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="seat"
            name="seat"
            value={formState.seat}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button name="sameAddress" onClick={handleFormChange}>
            {formState.addressSameAsParty ? "Use Different Address From Party" : "Use Same Address as Party"}
          </button>
        </div>
        <div>
          <input
            type="text"
            id="street1"
            name="street1"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.street1}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="street2"
            name="street2"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.street2}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="city"
            name="city"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.city}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="state"
            name="state"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.state}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.zipcode}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="country"
            name="country"
            disabled={formState.addressSameAsParty ? "disabled" : ""}
            value={formState.country}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex items-center justify-center p-6 rounded-b">
          <button
            type="submit"
            className="p-1 rounded-lg hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
