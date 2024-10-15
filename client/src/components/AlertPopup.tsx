import React, { useEffect, useState } from "react";

function AlertPopup(props: any) {
  let { children, open, onClose } = props;
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
        <div>{children}</div>
        <div className=" flex justify-end">
          <button
            type="submit"
            className=" orange"
            onClick={async () => {
              onClose();
            }}
          >
            Done
          </button>
        </div>
      </span>
    </div>
  );
}

export default AlertPopup;
