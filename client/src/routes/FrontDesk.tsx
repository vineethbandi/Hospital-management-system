import React, { useEffect } from "react";
import {
  getAllPatientsForFrontDesk as fetchAllPatients,
  registerPatient,
  fetchAdmissionHistory,
  fetchRescheduling,
  fetchScheduleTest,
  fetchRescheduleTest,
} from "../API";
import {
  ScheduleAppointmentPopUp,
  ScheduleTestPopUp,
} from "../components/SchedulePopUp";
import AdmitPatientPopUp from "../components/AdmitPatient";
import DischargePatientPopUp from "../components/DischargePatient";
import { getUser } from "../log";
import moment from "moment";

const formatDateTime = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD HH:mm:ss");
};
const formatDate = (date: Date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD");
};

function FrontDesk() {
  let [get1, setAdmit] = React.useState(null);
  let [get2, setDischarge] = React.useState(null);
  let [get3, setAppointmentPopup] = React.useState(null);
  let [get4, setTestPopup] = React.useState(null); //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  let [searchid, setSearchid] = React.useState(0);
  let [searchname, setSearchname] = React.useState("");
  let [history, setHistory] = React.useState<any>(null);
  let [reschedule, setReschedule] = React.useState<any>(null);
  let [rescheduleTest, setRescheduleTest] = React.useState<any>(null);
  let [scheduleTest, setScheduleTest] = React.useState<any>(null);
  let [appointmentTest, setAppointmentTest] = React.useState(1);
  let [fetchedPatients, setFetchedPatients] = React.useState<any>(null);
  const [selectedOption, setSelectedOption] = React.useState("Email");
  const [selectedPanel, setSelectedPanel] = React.useState(0);

  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []); //fetch the users from the server

  useEffect(() => {
    if (user) {
      fetchAllPatients(user).then((res) => {
        setFetchedPatients(res);
      });
      fetchAdmissionHistory(user).then((res) => {
        setHistory(res);
      });
      fetchRescheduling(user).then((res) => {
        setReschedule(res);
      });
      fetchScheduleTest(user).then((res) => {
        setScheduleTest(res);
      });
      fetchRescheduleTest(user).then((res) => {
        setRescheduleTest(res);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log({ fetchedPatients });
  }, [fetchedPatients]);

  function handleSearchId(e: any) {
    const id = parseInt(e.target.value);
    if (id < 0 || id.toString() == "NaN") {
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
  const handleOptionChange = (event: any) => {
    console.log("option change", event.target.value);
    if (event.target.value === "Email") {
      setSelectedOption("Email");
      return;
    }
    if (event.target.value === "Contact") {
      setSelectedOption("Contact");
      return;
    }
    setSelectedOption("Error");
    console.log("option change error");
  };
  const handlePanelChange = (event: any) => {
    if (event.target.value === "Panel") {
      setSelectedPanel(0);
    } else if (event.target.value === "Rescheduling") {
      setSelectedPanel(1);
    } else if (event.target.value === "History") {
      setSelectedPanel(2);
    } else if (event.target.value === "Test") {
      setSelectedPanel(3);
    }
  };

  return (
    <div className="px-6">
      <>
        <h2 className="mt-6 mb-2  ">Register Patient</h2>
        <form
          className="grid grid-cols-2 gap-3 mt-6 mb-2"
          onSubmit={async (e) => {
            e.preventDefault(); //prevent the page from reloading
            await registerPatient(
              user.username,
              user.password,
              (e.target as any).name.value,
              (e.target as any).Address.value,
              (e.target as any).contact.value,
              (e.target as any).email.value
            );
            fetchAllPatients(user).then((res) => {
              console.log("FETCHED", res);
              setFetchedPatients(res);
            });
          }}
        >
          <input
            type="text"
            placeholder="Patient name"
            name="name"
            autoComplete="off"
            className="col-span-1 py-2 "
            required
          />
          <input
            type="text"
            placeholder="Address"
            name="Address"
            autoComplete="off"
            className="col-span-1 py-2 "
            required
          />
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            autoComplete="off"
            className="col-span-1 py-2 "
            required
          />
          <input
            type="text"
            placeholder="Contact Details"
            name="contact"
            autoComplete="off"
            className="col-span-1 py-2 "
            required
          />
          <button
            type="submit"
            className="blue  col-span-2 place-self-end w-fit"
          >
            Register Patient
          </button>
        </form>

        <select
          className="mt-8 mb-2 shadow-lg font-bold"
          onChange={handlePanelChange}
        >
          <option value="Panel" className="">
            Control Panel
          </option>
          <option value="Test" className="">
            Schedule Test
          </option>
          <option value="Rescheduling" className="">
            Rescheduling
          </option>
          <option value="History" className="">
            Admission History
          </option>
        </select>

        {selectedPanel == 0 && (
          // selected  Control Panel
          <>
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
            </div>

            <div className=" grid grid-cols-11 gap-3 mt-8 mb-2 shadow-lg text-center">
              <h2 className=" col-span-1">ID</h2>
              <h2 className=" col-span-2">Patient Name</h2>
              <h2 className=" col-span-2">Address</h2>
              <select
                className=" col-span-2 font-bold text-lg md:text-xl outline-none focus:outline-none"
                onChange={handleOptionChange}
                value={selectedOption}
              >
                <option value="Contact" className="font-bold">
                  Contact
                </option>
                <option value="Email" className="font-bold">
                  Email
                </option>
              </select>
              <h2 className=" col-span-1">Room</h2>
              <h2 className=" col-span-1">Type</h2>
              <h2 className=" col-span-2">Actions</h2>
            </div>
            <div className=" mb-16 mt-8 flex flex-col gap-3 ">
              {fetchedPatients?.map(
                (fetchedPatient: any) =>
                  ((searchid == 0 && searchname == "") ||
                    ((searchid == 0 ||
                      fetchedPatient.ID.toString().startsWith(
                        searchid.toString()
                      )) &&
                      fetchedPatient.Name.toLowerCase().startsWith(
                        searchname.toLowerCase()
                      ))) && (
                    <div
                      className="grid grid-cols-11 gap-3"
                      key={fetchedPatient.ID}
                    >
                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {fetchedPatient.ID}
                      </div>
                      <div className="card col-span-2 whitespace-nowrap">
                        {fetchedPatient.Name}
                      </div>

                      <div className="card col-span-2 whitespace-nowrap">
                        {fetchedPatient.Address}
                      </div>

                      {selectedOption == "Contact" && (
                        <div className="card col-span-2 whitespace-nowrap">
                          {fetchedPatient.Contact}
                        </div>
                      )}
                      {selectedOption == "Email" && (
                        <div className="card col-span-2 whitespace-nowrap">
                          {fetchedPatient.Email}
                        </div>
                      )}

                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {fetchedPatient.admitted ? fetchedPatient.Room : "-"}
                      </div>
                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {fetchedPatient.admitted ? fetchedPatient.Type : "-"}
                      </div>
                      {/* Actions */}
                      <div className="col-span-2 flex gap-3">
                        {fetchedPatient.admitted ? (
                          // discharge button
                          <>
                            <button
                              className="col-span-1 red flex-1"
                              onClick={async () => {
                                setDischarge(fetchedPatient.ID);
                                fetchAllPatients(user).then((res) => {
                                  setFetchedPatients(res);
                                });
                                //discharge
                              }}
                            >
                              discharge
                            </button>

                            <DischargePatientPopUp
                              patientId={fetchedPatient.ID}
                              Name={fetchedPatient.Name}
                              Room={fetchedPatient.Room}
                              Type={fetchedPatient.Type}
                              open={fetchedPatient.ID === get2}
                              onClose={() => {
                                setDischarge(null);
                                fetchAllPatients(user).then((res) => {
                                  setFetchedPatients(res);
                                });
                                fetchAdmissionHistory(user).then((res) => {
                                  setHistory(res);
                                });
                              }}
                            />
                          </>
                        ) : (
                          // admit button
                          <>
                            <button
                              className="col-span-1 blue flex-1"
                              onClick={async () => {
                                setAdmit(fetchedPatient.ID);
                              }}
                            >
                              admit
                            </button>
                            <AdmitPatientPopUp
                              patientId={fetchedPatient.ID}
                              open={fetchedPatient.ID === get1}
                              onClose={() => {
                                setAdmit(null);
                                fetchAllPatients(user).then((res) => {
                                  setFetchedPatients(res);
                                });
                                fetchAdmissionHistory(user).then((res) => {
                                  setHistory(res);
                                });
                              }}
                            />
                          </>
                        )}
                        <button
                          className="col-span-1 orange flex-1"
                          onClick={async () => {
                            setAppointmentPopup(fetchedPatient.ID);
                          }}
                        >
                          Appoint
                        </button>
                        {/*Appointment */}
                        <ScheduleAppointmentPopUp
                          patientId={fetchedPatient.ID}
                          appID={null}
                          open={fetchedPatient.ID === get3}
                          onClose={() => {
                            setAppointmentPopup(null);
                            fetchAllPatients(user).then((res) => {
                              setFetchedPatients(res);
                            });
                          }}
                          update={false}
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        )}

        {selectedPanel == 1 && (
          // selectedPanel is Reschedule
          <>
            <form>
              <label>
                <input
                  name="type"
                  value="appointment"
                  type="radio"
                  className="mx-1 mt-8"
                  onChange={async (e) => {
                    setAppointmentTest(1);
                  }}
                  defaultChecked={appointmentTest === 1 ? true : false}
                />
                Appointment
              </label>
              <label>
                <input
                  name="type"
                  value="test"
                  type="radio"
                  className="mx-1 ml-6 mb-6"
                  onChange={async (e) => {
                    setAppointmentTest(0);
                  }}
                  defaultChecked={appointmentTest === 0 ? true : false}
                />
                Test
              </label>
            </form>
            {appointmentTest ? (
              // selected  reschedule Appointment
              <>
                <div className=" grid grid-cols-11 gap-3 mt-8 mb-2 shadow-lg text-center">
                  <h2 className=" col-span-1">ID</h2>
                  <h2 className=" col-span-2">Patient Name</h2>
                  <h2 className=" col-span-2">Address</h2>

                  <select
                    className=" col-span-2 font-bold text-lg md:text-xl outline-none focus:outline-none"
                    onChange={handleOptionChange}
                    value={selectedOption}
                  >
                    <option value="Contact" className="font-bold">
                      Contact
                    </option>
                    <option value="Email" className="font-bold">
                      Email
                    </option>
                  </select>
                  <h2 className=" col-span-2">Past Date</h2>
                  <h2 className=" col-span-2">Actions</h2>
                </div>
                <div className=" mb-16 mt-8 flex flex-col gap-3 ">
                  {reschedule?.map((Appointment: any) => (
                    <div
                      className=" grid grid-cols-11 gap-3"
                      key={Appointment.appID}
                    >
                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {Appointment.ID}
                      </div>
                      <div className="card col-span-2 whitespace-nowrap">
                        {Appointment.Name}
                      </div>

                      <div className="card col-span-2 whitespace-nowrap">
                        {Appointment.Address}
                      </div>
                      {selectedOption == "Contact" && (
                        <div className="card col-span-2 whitespace-nowrap">
                          {Appointment.Contact}
                        </div>
                      )}
                      {selectedOption == "Email" && (
                        <div className="card col-span-2 whitespace-nowrap">
                          {Appointment.Email}
                        </div>
                      )}

                      <div className="card col-span-2 whitespace-nowrap text-center">
                        {formatDate(Appointment.Date)}
                      </div>
                      <button
                        onClick={() => {
                          setAppointmentPopup(Appointment.ID);
                        }}
                        className={"col-span-2 orange"}
                      >
                        Reschedule
                      </button>
                      <ScheduleAppointmentPopUp
                        patientId={Appointment.ID}
                        appID={Appointment.appID}
                        open={Appointment.ID === get3}
                        onClose={() => {
                          setAppointmentPopup(null);
                          fetchRescheduling(user).then((res) => {
                            setReschedule(res);
                          });
                        }}
                        update={true}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // selected  reschedule Test
              <>
                <div className=" grid grid-cols-8 gap-3 mt-8 mb-2 shadow-lg text-center">
                  <h2 className=" col-span-1">Test ID</h2>
                  <h2 className=" col-span-1">Test Name</h2>
                  <h2 className=" col-span-2">Test Date</h2>
                  <h2 className=" col-span-1">Patient ID</h2>
                  <h2 className=" col-span-2">Patient Name</h2>
                  <h2 className=" col-span-1">Actions</h2>
                </div>
                <div className=" mb-16 mt-8 flex flex-col gap-3 ">
                  {rescheduleTest?.map((Test: any) => (
                    <div className=" grid grid-cols-8 gap-3" key={Test.testID}>
                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {Test.testID}
                      </div>
                      <div className="card col-span-1 whitespace-nowrap">
                        {Test.testName}
                      </div>
                      <div className="card col-span-2 whitespace-nowrap text-center">
                        {formatDateTime(Test.Date)}
                      </div>
                      <div className="card col-span-1 whitespace-nowrap text-center">
                        {Test.ID}
                      </div>
                      <div className="card col-span-2 whitespace-nowrap">
                        {Test.Name}
                      </div>

                      <button
                        onClick={() => {
                          setTestPopup(Test.ID);
                        }}
                        className={"col-span-1 orange"}
                      >
                        Reschedule Test
                      </button>
                      <ScheduleTestPopUp
                        patientId={Test.ID}
                        testID={Test.testID}
                        open={Test.ID === get4}
                        onClose={() => {
                          setTestPopup(null);
                          fetchRescheduleTest(user).then((res) => {
                            setRescheduleTest(res);
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {selectedPanel == 2 && (
          // selected  Admission History
          <>
            {/* <h2 className="mt-6 mb-2">Admissions</h2> */}
            <div className="grid grid-cols-10 gap-3 mt-8 mb-2 shadow-lg text-center">
              <h2 className=" col-span-1">ID</h2>
              <h2 className=" col-span-1">Patient ID</h2>
              <h2 className=" col-span-3">Patient Name</h2>
              <h2 className=" col-span-2">Admit Date</h2>
              <h2 className=" col-span-2">Discharge Date</h2>
              <h2 className=" col-span-1">Room No.</h2>
            </div>
            <div className=" mb-16 mt-6 flex flex-col gap-3">
              {history?.map((Admission: any) => (
                <div className="grid grid-cols-10 gap-3" key={Admission.appID}>
                  <div className="card col-span-1 text-center ">
                    {Admission.appID}
                  </div>
                  <div className="card col-span-1 text-center">
                    {Admission.Patient}
                  </div>
                  <div className="card col-span-3">{Admission.Name}</div>

                  <div className="card col-span-2 text-center">
                    {formatDate(Admission.Admit_Date)}
                  </div>
                  {Admission.Discharge_Date ? (
                    <div className="card col-span-2 text-center">
                      {formatDate(Admission.Discharge_Date)}
                    </div>
                  ) : (
                    <div className="card col-span-2 text-center">-</div>
                  )}
                  {/* room number */}
                  <div className="card col-span-1 text-center">
                    {Admission.Room}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedPanel == 3 && (
          // selected  Schedule Test
          <>
            <div className=" grid grid-cols-8 gap-3 mt-8 mb-2 shadow-lg text-center">
              <h2 className=" col-span-1">Test ID</h2>
              <h2 className=" col-span-2">Test Name</h2>
              <h2 className=" col-span-1">Patient ID</h2>
              <h2 className=" col-span-2">Patient Name</h2>
              <h2 className=" col-span-2">Actions</h2>
            </div>
            <div className=" mb-16 mt-8 flex flex-col gap-3 ">
              {scheduleTest?.map((Test: any) => (
                <div className=" grid grid-cols-8 gap-3" key={Test.testID}>
                  <div className="card col-span-1 whitespace-nowrap text-center">
                    {Test.testID}
                  </div>
                  <div className="card col-span-2 whitespace-nowrap">
                    {Test.testName}
                  </div>
                  <div className="card col-span-1 whitespace-nowrap text-center">
                    {Test.ID}
                  </div>
                  <div className="card col-span-2 whitespace-nowrap text-center">
                    {Test.Name}
                  </div>

                  <button
                    onClick={() => {
                      setTestPopup(Test.ID);
                    }}
                    className={"col-span-2 orange"}
                  >
                    Schedule Test
                  </button>
                  <ScheduleTestPopUp
                    patientId={Test.ID}
                    testID={Test.testID}
                    open={Test.ID === get4}
                    onClose={() => {
                      setTestPopup(null);
                      fetchScheduleTest(user).then((res) => {
                        setScheduleTest(res);
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default FrontDesk;
