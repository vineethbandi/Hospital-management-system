import React, { useEffect, useState } from "react";
import { dischargePatient } from "../API";
import { getUser } from "../log";

function DischargePatient(props: any) {
  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);
  let { patientId,Name, Room, Type, open, onClose } = props;
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <div
      className="fixed inset-0 grid place-content-center
    bg-black text-gray-700 px-6 bg-opacity-20
    "
      style={{ display: open ? "grid" : "none" }}
    >
      <span className="grid place-content-center gap-1 p-4 bg-slate-100  rounded-md shadow-xl mx-auto">
        <h1 className="mx-4">Discharge Patient {patientId}</h1>
        <div className="grid grid-cols-10 gap-3">
          <h3 className="cell col-span-4">Name</h3>
          <h3 className="cell col-span-3">Room Number</h3>
          <h3 className="cell col-span-3">Room Type</h3>
        </div>
        <div></div>
        <div className="grid grid-cols-10">
          <div className="col-span-4">{Name}</div>
          <div className="col-span-3">{Room}</div>
          <div className="col-span-3">{Type}</div>
        </div>
        <br />
        <div className="grid grid-cols-10">

          <button
            type="submit"
            className=" col-span-4 red w-fit place-self-end"
            onClick={() => {
                onClose();
            }}
          >
            close
          </button>

          <button
            type="submit"
            className=" col-span-3 blue w-fit place-self-end"
            onClick={async () => {
                let s = await dischargePatient(
                  user.username,
                  user.password,
                  patientId,
                );
                if (s.status === "error") {
                  alert("unable to discharge the patient");
                }
              onClose();
            }}
          >
          Confirm?
          </button>
        </div>
      </span>
    </div>
  );
}

export default DischargePatient;
