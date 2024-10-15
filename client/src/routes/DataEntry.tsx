import React, { useEffect } from "react";
import moment from "moment";
import { getUser } from "../log";
import { fetchTestUpdate, getAppointmentsWithNoPrescription } from "../API";
import AddPrescription from "../components/AddPrescription";
import UploadTestsPopup from "../components/UploadTestsPopup";

const formatDateTime = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD HH:mm:ss");
};
const formatDate = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD");
};

function DataEntry() {
  let [testUpdate, setTestUpdate] = React.useState([]);
  let [appointments, setAppointments] = React.useState([]);
  let [pop1, setPop1] = React.useState(null);
  let [pop2, setPop2] = React.useState(null);

  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);

  let [searchid, setSearchid] = React.useState(0);
  let [searchname, setSearchname] = React.useState("");

  function handleSearchId(e: any) {
    const id = parseInt(e.target.value);
    if (id < 0 || id.toString() == "NaN") {
      // alert("can't be less than 0");
      setSearchid(0);
      return;
    }
    setSearchid(id);
  }
  function handleSearchName(e: any) {
    const name = e.target.value;
    setSearchname(name);
  }
  function handlesubmitId() {
    setSearchid(0);
  }
  function handlesubmitName() {
    setSearchname("");
  }

  let [searchid2, setSearchid2] = React.useState(0);
  let [searchname2, setSearchname2] = React.useState("");
  function handleSearchId2(e: any) {
    const id = parseInt(e.target.value);
    if (id < 0 || id.toString() == "NaN") {
      // alert("can't be less than 0");
      setSearchid2(0);
      return;
    }
    setSearchid2(id);
  }
  function handleSearchName2(e: any) {
    const name = e.target.value;
    setSearchname2(name);
  }
  function handlesubmitId2() {
    setSearchid2(0);
  }
  function handlesubmitName2() {
    setSearchname2("");
  }
  useEffect(() => {
    if (!user) return;
    console.log({ user });
    getAppointmentsWithNoPrescription(user).then((res) => {
      setAppointments(res);
    });
    fetchTestUpdate(user).then((res) => {
      setTestUpdate(res);
    });
  }, [user]);

  const [selectedPanel, setSelectedPanel] = React.useState("Add Prescription");

  const handlePanelChange = (event: any) => {
    if (event.target.value === "Add Prescription") {
      setSelectedPanel("Add Prescription");
    } else if (event.target.value === "Upload Test Result and Report") {
      setSelectedPanel("Upload Test Result and Report");
    } else {
      setSelectedPanel("Add Prescription");
    }
  };
  return (
    <>
      <div className="px-6 flex flex-col  ">
        <select
          className="mt-8 mb-2 shadow-lg font-bold w-fit"
          onChange={handlePanelChange}
        >
          <option value="Add Prescription" className="">
            Add Prescription
          </option>
          <option value="Upload Test Result and Report" className="">
            Upload Test Result and Report
          </option>
        </select>
        {selectedPanel === "Add Prescription" && (
          <>
            {/* SEARCH */}
            <div className="flex flex-wrap gap-6 mt-6 mb-2">
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by ID:</div>
                <span className="flex gap-3">
                  <input
                    className="card flex-1"
                    type="number"
                    value={searchid > 0 ? searchid : ""}
                    onChange={handleSearchId}
                  />
                  <button className="red" onClick={handlesubmitId}>
                    clear
                  </button>
                </span>
              </label>
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by Patient Name:</div>
                <span className="flex gap-3">
                  <input
                    className="card flex-1"
                    type="text"
                    value={searchname}
                    onChange={handleSearchName}
                  />
                  <button className="red" onClick={handlesubmitName}>
                    clear
                  </button>
                </span>
              </label>
            </div>
            <div className="grid grid-cols-6 gap-3 mt-6 mb-2 text-center shadow-lg">
              <h3 className="col-span-1">Appointment ID</h3>
              <h3 className="col-span-1">Patient Name</h3>
              <h3 className="col-span-1">Doctor</h3>
              <h3 className="col-span-1">Date</h3>
              <h3 className="col-span-2">Actions</h3>
            </div>
            <div className="flex flex-col gap-3 whitespace-nowrap mt-4 mb-8">
              {appointments.map(
                (app: any) =>
                  ((searchid == 0 && searchname == "") ||
                    ((searchid == 0 ||
                      app.appID.toString().startsWith(searchid.toString())) &&
                      app.pName
                        .toLowerCase()
                        .startsWith(searchname.toLowerCase()))) && (
                    <div className="grid grid-cols-6 gap-3 " key={app.appID}>
                      <div className="card col-span-1 text-center">
                        {app.appID || "-"}
                      </div>
                      <div className="card col-span-1">{app.pName}</div>
                      <div className="card col-span-1">{app.dName}</div>
                      <div className="card col-span-1 text-center">
                        {formatDate(app.date)}
                      </div>
                      <button
                        className=" blue col-span-2"
                        onClick={async () => {
                          setPop1(app.appID);
                        }}
                      >
                        Add Prescription
                      </button>
                      <AddPrescription
                        appID={app.appID}
                        appDate={formatDate(app.date)}
                        open={pop1 == app.appID}
                        onClose={() => {
                          setPop1(null);
                          //update the list of appointments
                          getAppointmentsWithNoPrescription(user).then(
                            (res) => {
                              setAppointments(res);
                            }
                          );
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          </>
        )}
        {selectedPanel === "Upload Test Result and Report" && (
          <>
            {/* SEARCH */}
            <div className="flex flex-wrap gap-6 mt-6 mb-2">
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by ID:</div>
                <span className="flex gap-3">
                  <input
                    className="card flex-1"
                    type="number"
                    value={searchid2 > 0 ? searchid2 : ""}
                    onChange={handleSearchId2}
                  />
                  <button className="red" onClick={handlesubmitId2}>
                    clear
                  </button>
                </span>
              </label>
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by Test Name:</div>
                <span className="flex gap-3">
                  <input
                    className="card flex-1"
                    type="text"
                    value={searchname2}
                    onChange={handleSearchName2}
                  />
                  <button className="red" onClick={handlesubmitName2}>
                    clear
                  </button>
                </span>
              </label>
            </div>
            <div className="grid grid-cols-6 gap-3 mt-6 mb-2 text-center shadow-lg">
              <h3 className="col-span-1">Test ID</h3>
              <h3 className="col-span-1">Test Name</h3>
              <h3 className="col-span-1">Patient ID</h3>
              <h3 className="col-span-1">Patient Name</h3>
              <h3 className="col-span-1">Date</h3>
              <h3 className="col-span-1">Actions</h3>
            </div>
            <div className="flex flex-col gap-3 whitespace-nowrap mt-4 mb-8">
              {testUpdate.map(
                (test: any) =>
                  ((searchid2 == 0 && searchname2 == "") ||
                    ((searchid2 == 0 ||
                      test.ID.toString().startsWith(searchid2.toString())) &&
                      test.Name.toLowerCase().startsWith(
                        searchname2.toLowerCase()
                      ))) && (
                    <div className="grid grid-cols-6 gap-3 " key={test.ID}>
                      <div className="card col-span-1 text-center">
                        {test.ID || "-"}
                      </div>
                      <div className="card col-span-1">{test.Name || "-"}</div>
                      <div className="card col-span-1 text-center">
                        {test.pID || "-"}
                      </div>
                      <div className="card col-span-1 ">
                        {test.pName || "-"}
                      </div>
                      <div className="card col-span-1 text-center">
                        {formatDateTime(test.date)}
                      </div>
                      <button
                        onClick={async () => {
                          setPop2(test.ID);
                        }}
                        className="orange"
                      >
                        Upload Test Result
                      </button>
                      <UploadTestsPopup
                        user={user}
                        open={pop2 == test.ID}
                        test={test}
                        onClose={() => {
                          setPop2(null);
                          fetchTestUpdate(user).then((res) => {
                            setTestUpdate(res);
                          });
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DataEntry;
