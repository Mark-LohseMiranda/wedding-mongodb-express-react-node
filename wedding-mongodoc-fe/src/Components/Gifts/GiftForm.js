import React from "react";

export default function GiftForm({ formState, handleFormChange, formSubmit }) {
  return (
    <div>
      <form id="giftForm" onSubmit={formSubmit}>
        <div>
          <input
            type="text"
            id="item"
            name="item"
            value={formState.item}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <input
            type="date"
            id="dateThankYouSent"
            name="dateThankYouSent"
            value={formState.dateThankYouSent}
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
