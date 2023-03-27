import React, {useState} from "react";
import API from "../../API/API";
import WeddingForm from "./WeddingForm";

export default function CreateWedding({
    setUserState,
    setShowAdd
}) {
    const [formState, setFormState] = useState({
        name: "",
        date: "",
        spouseName1: "",
        spouseName2: "",
        location: "",
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
        API.createWedding(formState).then((res) => {
          setUserState(res.data);
          localStorage.setItem("weddingData",JSON.stringify(res.data))
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
            <WeddingForm
              formState={formState}
              handleFormChange={handleFormChange}
              formSubmit={formSubmit}
            />
          </div>
        </div>
      );
}
