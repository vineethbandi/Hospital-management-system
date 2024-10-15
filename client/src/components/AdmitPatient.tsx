import React, { useEffect, useState } from "react";
import { admitPatient } from "../API";
import { getUser } from "../log";

function AdmitPatient(props: any) {
  let [tries, setTrys] = useState(0);
  let [errorMessage, setErrorMessage] = useState("Unknown Error");
  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);
  let { patientId, open, onClose } = props;
  useEffect(() => {
    //prevent scrolling when modal is open
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <div
      className="fixed inset-0 grid place-content-center
    bg-black text-gray-700 px-6 bg-opacity-30
    "
      style={{ display: open ? "grid" : "none" }}
    >
      <span className="grid place-content-center gap-1 p-4 bg-slate-100  rounded-md shadow-xl mx-auto">
        <form
          className="grid grid-cols-2 gap-x-3"
          onSubmit={async (e) => {
            e.preventDefault();
            let s = await admitPatient(
              user.username,
              user.password,
              patientId,
              (e.target as any).roomType.value
            );
            if (s.status === "error") {
              setErrorMessage(s.data);
              setTrys(tries + 1);
              return;
            }
            onClose();
          }}
        >
          <div className="col-span-2 flex flex-col gap-2 py-2 mb-2">
            <label className="text-gray-500 mt-2">Room Type</label>
            <select name="roomType">
              <option value="General">General</option>
              <option value="HDU">HDU</option>
              <option value="Cabin">Cabin</option>
              <option value="ICU">ICU</option>
            </select>
          </div>
          <div
            className="text-red-500 mt-1 col-span-2"
            style={{ opacity: tries == 0 ? "0" : "1" }}
          >
            {errorMessage}
          </div>
          <div className="flex col-span-2 justify-end">
            <span
              onClick={() => {
                onClose();
              }}
              className="underline h-10 leading-10 mx-4 cursor-pointer"
            >
              {" "}
              Close
            </span>
            <button type="submit" className="orange w-fit ">
              Confirm
            </button>
          </div>
        </form>
      </span>
    </div>
  );
}

export default AdmitPatient;
