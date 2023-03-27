import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateWedding from "./UpdateWedding";
import CreateWedding from "./CreateWedding";
import Counts from "../Counts/Counts";
import API from "../../API/API";

export default function Weddings({ userState, setUserState, weddingId, setWeddingId }) {
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  

  const selectWedding = (e) => {
    setWeddingId(e.target.getAttribute("data-id"));
    localStorage.setItem("weddingId",e.target.getAttribute("data-id"))
    navigate("/parties")
  }

  const updateWedding = (e) => {
    setWeddingId(e.target.getAttribute("data-id"));
    setShowUpdate(true);
  };

  const deleteWedding = (e) => {
    if (
      window.confirm(
        "Are you sure you want to delete this wedding? It cannot be undone!"
      )
    ) {
      try {
        API.deleteWedding(e.target.getAttribute("data-id")).then((res) => {
          setUserState(res.data);
          localStorage.setItem("weddingData", JSON.stringify(res.data));
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("weddingData"));
    if (!info) navigate("/");
    setUserState(info);
  }, [setUserState, navigate]);

  return (
    <div className="flex flex-wrap justify-center gap-5 m-5">
      <div>
        <button
          onClick={() => {
            setShowAdd(true);
          }}
        >
          Add Wedding
        </button>
      </div>
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100">
        {userState?.weddings?.map((wedding) => {
          return (
            <div key={wedding._id}>
              <div>{wedding.name}</div>
              <div>
                <p>
                  Spouse: {wedding.spouseName1 ? wedding.spouseName1 : "None"}
                </p>
                <p>
                  Spouse : {wedding.spouseName2 ? wedding.spouseName2 : "None"}
                </p>
                <p>Location: {wedding.location ? wedding.location : "None"}</p>
                <p>Date: {wedding.date ? wedding.date.slice(0,10) : "None"}</p>
              </div>
              <div>
                <p>Gifts: </p>
                <p>Guests: {wedding.parties && <Counts data={wedding.parties} item="guests"/>}</p>
                <p>Parties: {wedding.parties && wedding.parties.length}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <button
                    onClick={selectWedding}
                    data-id={wedding._id}
                    className="hover:text-sky-200"
                  >
                    -=Select=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={updateWedding}
                    data-id={wedding._id}
                    className="hover:text-sky-200"
                  >
                    -=Edit=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={deleteWedding}
                    data-id={wedding._id}
                    className="hover:text-red-500"
                  >
                    -=Delete=-
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showUpdate && (
        <UpdateWedding
          userState={userState}
          setUserState={setUserState}
          weddingId={weddingId}
          setShowUpdate={setShowUpdate}
        />
      )}

      {showAdd && (
        <CreateWedding setUserState={setUserState} setShowAdd={setShowAdd} />
      )}
    </div>
  );
}
