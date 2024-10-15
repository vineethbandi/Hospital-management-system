import React, { useEffect, useState } from "react";
import {
  dataentryAddResult,
} from "../API";
import { getUser } from "../log";

let fileToHexString = (file: File) => {
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = function (event: any) {
      const arrayBuf = event.target.result as ArrayBuffer;
      let fileArrayBuffer = new Uint8Array(arrayBuf).buffer;
      let fileHexString = [...new Uint8Array(fileArrayBuffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
      // //try to get back the array buffer
      // let fileArrayBuffer2 = new Uint8Array(
      //   fileHexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
      // ).buffer;
      // //convert to blob and open in new window
      // let blob = new Blob([fileArrayBuffer2], { type: "application/pdf" });
      // let url = URL.createObjectURL(blob);
      // window.open(url);
      resolve(fileHexString);
    };
    reader.readAsArrayBuffer(file);
  });
};
function UploadTestsPopup(props: any) {
  let { test, open, onClose } = props;
  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);
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
        <h1 className="mx-4">Upload Test Result {test.ID}</h1>
        <form
          className="text-gray-900 mt-2 flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            let data = new FormData(e.target as HTMLFormElement);
            let result = data.get("result");
            let file = data.get("file") as File;
            let image = data.get("image") as File;
            let fileHexString = await fileToHexString(file as File);
            let imageHexString = await fileToHexString(image as File);
            let props = {
              ID: test.ID,
              result: result,
              report: fileHexString,
              image: imageHexString,
            };
            let t = setTimeout(() => {
              alert("server is not responding");
              onClose();
            }, 3000);
            let s = await dataentryAddResult(user, props);
            //revoke the time out
            clearTimeout(t);
            if (s.status == "ok") onClose();
          }}
        >
          <div className="mt-4 mb-2">Result*</div>
          <select className="flex-1" name="result">
            <option value="positive">positive</option>
            <option value="negative">negative</option>
          </select>
          <div className="mt-4 mb-2">Report</div>
          <input name="file" type="file" accept=".pdf" />
          <div className="mt-4 mb-2">Image</div>
          <input name="image" type="file" accept="image/*" />
          <div className="flex justify-end mt-8 mr-2">
            <span
              onClick={() => {
                onClose();
              }}
              className="underline h-10 leading-10 mx-4 cursor-pointer"
            >
              cancel
            </span>
            <button type="submit" className="orange w-20">
              Done
            </button>
          </div>
        </form>
      </span>
    </div>
  );
}

export default UploadTestsPopup;
