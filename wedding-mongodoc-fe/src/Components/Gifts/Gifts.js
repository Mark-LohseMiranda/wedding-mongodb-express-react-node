import React, { useState, useEffect } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import CreateGift from "./CreateGift";
import UpdateGift from "./UpdateGift";

export default function Gifts({
  userState,
  setUserState,
  weddingId,
  setWeddingId,
  partyId,
  setPartyId,
  guestId,
  setGuestId,
  giftId,
  setGiftId,
}) {
  const [wedding, setWedding] = useState();
  const [party, setParty] = useState();
  const [guest, setGuest] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  const deleteGift = (e) => {
    if (
      window.confirm(
        "Are you sure you want to delete this gift? It cannot be undone!"
      )
    ) {
      try {
        API.deleteGift(
          weddingId,
          partyId,
          guestId,
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
  const updateGift = (e) => {
    setGiftId(e.target.getAttribute("data-id"));
    setShowUpdate(true);
  };

  useEffect(() => {
    try {
      const tempUserState = JSON.parse(localStorage.getItem("weddingData"));
      const tempWeddingId = localStorage.getItem("weddingId");
      const tempPartyId = localStorage.getItem("partyId");
      const tempGuestId = localStorage.getItem("guestId");
      const tempWedding = tempUserState.weddings?.filter((item) => {
        return item._id === tempWeddingId;
      });
      const tempParty = tempWedding[0].parties?.filter((item) => {
        return item._id === tempPartyId;
      });
      const tempGuest = tempParty[0].guests?.filter((item) => {
        return item._id === tempGuestId;
      });
      setWedding(tempWedding[0]);
      setParty(tempParty[0]);
      setGuest(tempGuest[0]);
    } catch (err) {
      console.log(err.message);
    }
  }, [navigate, userState, setWedding, setParty, setGuest]);

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
  useEffect(() => {
    const tempGuestId = localStorage.getItem("guestId");
    if (!tempGuestId) navigate("/parties");
    setGuestId(tempGuestId);
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
        <span
          onClick={() => {
            navigate("/guests");
          }}
        >
          {party?.name && party.name}
        </span> {" >> "}
        {guest?.name && guest.name}
      </div>
      <div>
        <button
          onClick={() => {
            setShowAdd(true);
          }}
        >
          Add Gift
        </button>
      </div>
      <div className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100">
        {guest?.gifts?.map((gift) => {
          return (
            <div key={gift._id}>
              <div>{gift.item}</div>
              <div>
                {gift.dateThankYouSent
                  ? gift.dateThankYouSent.slice(0, 10)
                  : "None"}
              </div>
              <div className="flex justify-around">
                <div>
                  <button
                    onClick={updateGift}
                    data-id={gift._id}
                    className="hover:text-sky-200"
                  >
                    -=Edit=-
                  </button>
                </div>
                <div>
                  <button
                    onClick={deleteGift}
                    data-id={gift._id}
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
      {showAdd && (
        <CreateGift
          setUserState={setUserState}
          weddingId={weddingId}
          partyId={partyId}
          guestId={guestId}
          setShowAdd={setShowAdd}
        />
      )}
      {showUpdate && (
        <UpdateGift
          userState={userState}
          setUserState={setUserState}
          weddingId={weddingId}
          partyId={partyId}
          guestId={guestId}
          giftId={giftId}
          setShowUpdate={setShowUpdate}
        />
      )}
    </div>
  );
}
