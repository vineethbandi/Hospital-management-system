import React, { useEffect } from "react";
import { getTreatments } from "../API";

function Treatments(props: any) {
  let { user, open, onClose } = props;
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!user) return;
    if (open)
      getTreatments(user.username, user.password, props.patientId).then(
        (treatments) => {
          console.log({ treatments });
          setTreatments(treatments.result);
        }
      );
  }, [open]);
  let [treatments, setTreatments] = React.useState<any>([]);
  return (
    <div
      className="fixed inset-0 grid place-content-center 
    bg-slate-300 text-gray-700 px-6 overflow-y-auto
    "
      style={{ display: open ? "grid" : "none" }}
    >
      <h1 className="mx-4 text-center">
        Treatments of patient {props.patientId}
      </h1>
      <span className="grid place-content-center gap-1 p-4 bg-slate-100  rounded-md shadow-xl mx-auto">
        <div className="grid grid-cols-7 gap-3 mb-2 mt-4">
          <h3 className="cell col-span-2">Name</h3>
          <h3 className="cell col-span-2">Date</h3>
          <h3 className="cell col-span-3">Dosage</h3>
        </div>
        <div className="flex flex-col gap-3 whitespace-nowrap mb-8">
          {treatments.map((treatment: any) => (
            <div className="grid grid-cols-7 gap-5" key={treatment.treatmentID}>
              <div className="cell col-span-2">{treatment.treatmentName}</div>
              <div className="cell col-span-2">
                {treatment.Date.slice(0, 19).replace("T", " ")}
              </div>
              <div className="cell col-span-3">{treatment.Dosage}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            onClose();
          }}
          className="red w-fit place-self-end"
        >
          close
        </button>
      </span>
    </div>
  );
}

export default Treatments;
