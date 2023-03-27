import React, {useState} from "react";

export default function WeddingForm({formState, handleFormChange, formSubmit}) {

    return (
        <div>
      <form
        className="z-10 p-2 mt-3 rounded-lg shadow-xl bg-slate-200/90"
        id="updateWedding"
        onSubmit={formSubmit}
      >
        
        <div className="mt-6 mb-3 form-floating xl:w-96">
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="name">Wedding Name*:</label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="text"
            id="spouseName1"
            name="spouseName1"
            value={formState.spouseName1}
            onChange={handleFormChange}
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="spouseName1"
          >
            Spouse Name:
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="text"
            id="spouseName2"
            name="spouseName2"
            value={formState.spouseName2}
            onChange={handleFormChange}
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="spouseName2"
          >
            Spouse Name:
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="text"
            id="location"
            name="location"
            value={formState.location}
            onChange={handleFormChange}
          />
          <label
            className="text-gray-700 dark:text-slate-300"
            htmlFor="location"
          >
            Location:
          </label>
        </div>
        <div className="mb-3 form-floating xl:w-96">
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleFormChange}
            value={formState.date}
          />
          <label className="text-gray-700 dark:text-slate-300" htmlFor="date">
            Wedding Date:
          </label>
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
    )

}