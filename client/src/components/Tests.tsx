import moment from "moment";
import React from "react";
import { getTests } from "../API";

const formatDateTime = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD HH:mm:ss");
};
function Tests(props: any) {
  let { user, open, onClose } = props;
  let [tests, setTests] = React.useState<any>([]);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!user) return;
    if (open)
      getTests(user.username, user.password, props.patientId).then((tests) => {
        console.log(tests);
        setTests(tests.result);
      });
  }, [open]);
  const formatDate = (date: Date) => {
    let d = moment(date);
    return d.format("YYYY-MM-DD");
  };
  return (
    <div
      className="fixed inset-0 grid place-content-center
    bg-slate-300 text-gray-700 px-6 overflow-y-auto
    "
      style={{ display: open ? "grid" : "none" }}
    >
      <h1 className="mx-4 text-center">Tests of patient {props.patientId}</h1>
      <span className="grid place-content-center gap-3 p-4 bg-slate-100  rounded-md shadow-xl mx-auto relative">
        <div className="grid grid-cols-9 gap-3 mb-2 mt-4">
          <h3 className="cell col-span-2">Name</h3>
          <h3 className="cell col-span-3">Date</h3>
          <h3 className="cell col-span-2">Result</h3>
          <h3 className="cell col-span-1">Report</h3>
          <h3 className="cell col-span-1">Image</h3>
        </div>
        <div className="flex flex-col gap-3 whitespace-nowrap mb-8">
          {tests.map((test: any) => (
            <div className="grid grid-cols-9 gap-3" key={test.ID}>
              <div className="cell col-span-2">{test.Name}</div>
              <div className="cell col-span-3">
                {test.Date ? formatDateTime(test.Date) : "Pending..."}
              </div>
              <div className="cell col-span-2">
                {test.Result || "Pending..."}
              </div>
              {test.Report ? (
                <button
                  onClick={() => {
                    const buffer = test.Report.data as ArrayBuffer;

                    let binary = [...new Uint8Array(buffer)]
                      .map((x) => x.toString(16).padStart(2, "0"))
                      .join("");
                    const binaryData = new Uint8Array(
                      (binary as any)
                        .match(/[\da-f]{2}/gi)
                        .map(function (h: any) {
                          return parseInt(h, 16);
                        })
                    ).buffer;

                    const blob = new Blob([binaryData], {
                      type: "application/pdf",
                    });
                    console.log(blob);
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.target = "_blank";
                    link.click();
                    setTimeout(() => URL.revokeObjectURL(url), 5000);
                  }}
                  className="orange col-span-1"
                >
                  open
                </button>
              ) : (
                <div className="cell col-span-1"> None</div>
              )}

              {test.Image ? (
                <button
                  onClick={() => {
                    const buffer = test.Image.data as ArrayBuffer;

                    let binary = [...new Uint8Array(buffer)]
                      .map((x) => x.toString(16).padStart(2, "0"))
                      .join("");
                    const binaryData = new Uint8Array(
                      (binary as any)
                        .match(/[\da-f]{2}/gi)
                        .map(function (h: any) {
                          return parseInt(h, 16);
                        })
                    ).buffer;

                    const blob = new Blob([binaryData], { type: "image/*" });
                    // console.log(blob);
                    const url = URL.createObjectURL(blob);
                    // window.open(url, '_blank');
                    // setTimeout(() => URL.revokeObjectURL(url), 5000);

                    fetch(url)
                      .then((response) => {
                        const disposition = response.headers.get(
                          "Content-Disposition"
                        );
                        const type = response.headers.get("Content-Type");
                        return response.blob().then((blob) => {
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.target = "_blank";
                          link.download =
                            disposition || `TestImage_${test.Name}_${test.ID}`;
                          link.click();
                        });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                  className="orange col-span-1"
                >
                  open
                </button>
              ) : (
                <div className="cell col-span-1"> None</div>
              )}
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

export default Tests;
