import React, { useEffect, useState } from "react";
import { getAllPatientsForDoctor, getAppointments } from "../API";
import Tests from "../components/Tests";
import Treatments from "./Treatments";
import moment from "moment";
import { getUser } from "../log";

const formatDate = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD");
};

function Doctor() {
  let [appointments, setAppointments] = React.useState([]);
  let [patients, setPatients] = React.useState([]);
  let [pop1, setPop1] = React.useState(null);
  let [pop2, setPop2] = React.useState(null);
  let [searchid, setSearchid] = React.useState(0);
  let [searchname, setSearchname] = React.useState("");
  let [searchid2, setSearchid2] = React.useState(0);
  let [searchname2, setSearchname2] = React.useState("");
  let [searchdate, setSearchdate] = React.useState(null);
  const [selectedPanel, setSelectedPanel] = React.useState(0);

  const date = new Date();
  const hours = date.getHours();
  let greeting;
  if (hours >= 0 && hours < 12) {
    greeting = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);

  useEffect(() => {
    if (!user) return;
    console.log({ user });
    getAppointments(user.username, user.password).then((res) => {
      console.log({ res });
      setAppointments(res.data);
    });
    getAllPatientsForDoctor(user).then((res) => {
      setPatients(res);
    });
  }, [user]);

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
  function handleDate(e: any) {
    const date = e.target.value;
    setSearchdate(date);
    console.log(searchdate);
  }
  return (
    <>
      <div className="px-6 flex flex-col">
        <h2 className="mt-6 mb-2">Dashboard</h2>
        <div className="mt-2 mb-2">
          {greeting} Sir, you have{" "}
          <span className=" text-orange-600">{appointments.length} </span>
          upcoming Appointments!
        </div>
        <select
          name="select"
          className="mt-6 mb-2 shadow-lg font-bold w-fit"
          onChange={(event: any) => {
            if (event.target.value === "Appointment") {
              setSelectedPanel(0);
            } else {
              setSelectedPanel(1);
            }
          }}
        >
          <option value="Appointment">Appointments</option>
          <option value="Patient Info">Patient Info</option>
        </select>
        {selectedPanel == 0 ? (
          <>
            {/* Appointment */}
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
                <div className="mb-2">Search by Name:</div>
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
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by Date:</div>
                <input
                  onChange={handleDate}
                  min={formatDate(new Date())}
                  className=" h-10 card w-full"
                  type={"date"}
                  placeholder="patient name"
                  name="scheduleDate"
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="grid grid-cols-7 gap-3 mt-6 mb-2 shadow-lg text-center">
              <h3 className="col-span-1">Patient ID</h3>
              <h3 className="col-span-2">Patient Name</h3>
              <h3 className="col-span-1">Contact</h3>
              <h3 className="col-span-2">Email</h3>
              <h3 className="col-span-1">Date</h3>
              {/* <h3 className="col-span-2">Priority</h3> */}
            </div>
            <div className="flex flex-col gap-3 whitespace-nowrap mb-8">
              {appointments.sort((a: any, b: any) => {
                if (a.date > b.date) return 1;
                if (a.date < b.date) return -1;
                return b.priority - a.priority;
              }) &&
                appointments.map(
                  (appointment: any) =>
                    (searchdate != null && searchdate != ""
                      ? searchdate == formatDate(appointment.date) //date from sql
                      : (searchid == 0 && searchname == "") ||
                        ((searchid == 0 ||
                          appointment.pID
                            .toString()
                            .startsWith(searchid.toString())) &&
                          appointment.pName
                            .toLowerCase()
                            .startsWith(searchname.toLowerCase()))) && (
                      <div
                        className="grid grid-cols-7 gap-3 "
                        key={appointment.appID}
                      >
                        <div className="card col-span-1 text-center">
                          {appointment.pID}
                        </div>
                        <div className="card col-span-2">
                          {appointment.pName}
                        </div>
                        <div className="card col-span-1">
                          {appointment.Contact}
                        </div>
                        <div className="card col-span-2">
                          {appointment.Email}
                        </div>
                        <div className="card col-span-1 text-center">
                          {formatDate(appointment.date)}
                        </div>
                        {/* <div className="card col-span-2">{appointment.priority}</div> */}
                      </div>
                    )
                )}
            </div>
          </>
        ) : (
          <>
            {/* Paitent INFO */}
            <div className="flex flex-wrap gap-6 mt-6 mb-2">
              <label className="flex-1 whitespace-nowrap">
                <div className="mb-2">Search by ID:</div>
                <span className="flex gap-3">
                  <input
                    className=" card flex-1"
                    type="number"
                    value={searchid2 > 0 ? searchid2 : ""}
                    onChange={handleSearchId2}
                  />
                  <button className="red" onClick={handlesubmitId2}>
                    clear
                  </button>
                </span>
              </label>
              <label className="whitespace-nowrap flex-1">
                <div className="mb-2">Search by Name:</div>
                <span className="flex gap-3">
                  <input
                    className=" card flex-1"
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
            <div className=" flex flex-col mb-16 ">
              <div className="grid grid-cols-8 gap-3 mb-2 mt-4 shadow-lg text-center">
                <h3 className=" col-span-1 ">ID</h3>
                <h3 className=" col-span-2 ">Name</h3>
                <h3 className=" col-span-1">Contact</h3>
                <h3 className=" col-span-2 ">Email</h3>
                <h3 className="col-span-2">Actions</h3>
              </div>

              <div className="flex flex-col gap-3 whitespace-nowrap">
                {patients.sort((a: any, b: any) => a.ID - b.ID) &&
                  patients.map(
                    (patient: any) =>
                      ((searchid2 == 0 && searchname2 == "") ||
                        ((searchid2 == 0 ||
                          patient.ID
                            .toString()
                            .startsWith(searchid2.toString())) &&
                          patient.Name
                            .toLowerCase()
                            .startsWith(searchid2.toString().toLowerCase()) &&
                          searchname2 != "" &&
                          patient.Name.toLowerCase().startsWith(
                            searchname2.toLowerCase()
                          ))) && (
                        <div
                          className="grid grid-cols-8 gap-3"
                          key={patient.ID}
                        >
                          <div className="card col-span-1 text-center ">
                            {patient.ID}
                          </div>
                          <div className="card col-span-2">{patient.Name}</div>
                          <div className="card col-span-1">
                            {patient.Contact}
                          </div>
                          <div className="card col-span-2">{patient.Email}</div>
                          <button
                            onClick={async () => {
                              setPop1(patient.ID);
                            }}
                            className=" blue"
                          >
                            treatments
                          </button>
                          <button
                            onClick={async () => {
                              setPop2(patient.ID);
                            }}
                            className="orange"
                          >
                            tests
                          </button>
                          <Treatments
                            user={user}
                            open={pop1 == patient.ID}
                            patientId={patient.ID}
                            onClose={() => {
                              setPop1(null);
                            }}
                          />
                          <Tests
                            user={user}
                            open={pop2 == patient.ID}
                            patientId={patient.ID}
                            onClose={() => {
                              setPop2(null);
                            }}
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Doctor;
