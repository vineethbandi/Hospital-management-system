import { encode } from "base-64";
// let SERVER_URL = "https://hospital-paras.azurewebsites.net";
let SERVER_URL = "https://dbms-paras.onrender.com";
// let SERVER_URL = "http://localhost:3000";

// SERVER_URL = "http://10.145.179.195:3000";
let my_alert = console.warn;
export const login = async (username, password) => {
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  console.log("in API");
  let response = await fetch(SERVER_URL + "/", config);
  let json = await response.json();
  console.log("login:", { json });
  if (json.status && json.status == "error") {
    return { status: "error", reason: json.reason };
  }
  console.log("here");
  return {
    status: "ok",
    username: username,
    password: password,
    type: json.Type,
    name: json.Name,
  };
};

// 1. Patient  registration/discharge
export const registerPatient = async (
  username,
  password,
  name,
  Address,
  contact,
  email
) => {
  my_alert("API call: registerPatient(" + name + ")");
  //server registers a new patient and returns the id
  console.log(name);
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      Address: Address,
      contact: contact,
      email: email,
    }),
  };
  let response = await fetch(SERVER_URL + "/register", config);
  let json = await response.json();
  return json;
};
//and doctor  appointment/testscheduling–information  about  new patients need to be registered, appointments based on availability and priority should be scheduled, doctor  should  be  notified  about  the  appointments  in  a  dashboard.
export const scheduleAppointment = async (
  username,
  password,
  patientId,
  date,
  priority
) => {
  my_alert("API call: scheduleAppointment()");
  console.log(username, password, patientId, date, priority);
  //server
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      date: date,
      priority: priority,
    }),
  };
  let response = await fetch(SERVER_URL + "/appointment/schedule", config);
  console.log("response recv");
  let json = await response.json();
  console.log({ schedule: json });
  return json;
};

export const scheduleTest = async (username, password, testID, date) => {
  my_alert("API call: scheduleTest()");
  console.log(username, password, testID, date);
  //server
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      testID: testID,
      date: date,
    }),
  };
  console.log(config);
  let response = await fetch(SERVER_URL + "/test/schedule", config);
  console.log("response recv");
  let json = await response.json();
  console.log({ schedule: json });
  return json;
};

export const updateAppointment = async (
  username,
  password,
  appID,
  date,
  priority
) => {
  my_alert("API call: scheduleAppointment()");
  console.log(username, password, appID, date, priority);
  //server
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appID: appID,
      date: date,
      priority: priority,
    }),
  };
  let response = await fetch(
    SERVER_URL + "/appointment/updateSchedule",
    config
  );
  console.log("response recv");
  let json = await response.json();
  console.log({ schedule: json });
  return json;
};

//For  admitted  patients  a  room should be assigned based on available room capacity.
//For discharged patients information should be preserved but room occupancy should be updated.
//The workflow should also support scheduling tests and treatments prescribed by doctors.

export const admitPatient = async (username, password, patientId, roomType) => {
  my_alert("API call: admitPatient(" + patientId + ")");
  console.log(username, password, patientId, roomType);
  //server admits an existing patient to a room and returns the room number
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      type: roomType,
    }),
  };
  let response = await fetch(SERVER_URL + "/admit", config);
  console.log("get:/admit response recv");
  let json = await response.json();
  console.log({ response: json });
  return json;
};

export const dischargePatient = async (username, password, patientId) => {
  my_alert("API call: dischargePatient(" + patientId + ")");
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
    }),
  };
  let response = await fetch(SERVER_URL + "/discharge", config);
  let json = await response.json();
  console.log({ discharge: json });
  return json;
};

//(bonus point: using a calendar to schedule)
//2. Patient  data  entry –All the  health  information  of a  patient  including  test  results  and  treatments administered should be recorded.

//(bonus point: supporting storage and display of images e.g., x-ray)

//3. Doctor dashboard –all the records of the patients treated by a doctor should be displayed to her as a  dashboard.

export const getAppointments = async (username, password) => {
  // get all pending appointments of a doctor
  my_alert("API call: getAppointments()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/doctor/appointments", config);
  let json = await response.json();
  return json;
};
/**gets all patient list for frontdesk */
export const getAllPatientsForFrontDesk = async ({ username, password }) => {
  my_alert("API call: getAllPatients()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/frontdesk/patients", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

export const getAppointmentsWithNoPrescription = async ({
  username,
  password,
}) => {
  my_alert("API call: getAppointmentsWithNoPrescription()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(
    SERVER_URL + "/dataentry/appointments/noprescription",
    config
  );
  let json = await response.json();
  console.log({ getAppointmentListForDataEntry: json });
  return json;
};

export const dataentryAddResult = async ({ username, password }, props) => {
  my_alert("API call: dataentryAddResult()");
  console.log(username, password, props);
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };
  let response = await fetch(SERVER_URL + "/dataentry/testresult", config);
  let json = await response.json();
  console.log({ dataentryAddResult_RES_JSON: json });
  return json;
};

// OLD
export const getAppointmentListForDataEntry = async ({
  username,
  password,
}) => {
  my_alert("API call: getAppointmentListForDataEntry()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/dataentry/appointments", config);
  let json = await response.json();
  console.log({ getAppointmentListForDataEntry: json });
  return json;
};

//MASTER DATAENTRY

export const addPrescription = async (props) => {
  my_alert("API call: addPrescription()");
  console.log({ PROPS: props });
  console.log({ stringified: JSON.stringify(props) });
  //DONE:
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(props.username + ":" + props.password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };
  console.log({ config });
  let response = await fetch(SERVER_URL + "/dataentry/prescription", config);
  let json = await response.json();
  console.log({ masterDATAENTRY: json });
  return json;
};

// Doctor  may  also  query for  any patient  information.

export const getAllPatientsForDoctor = async ({ username, password }) => {
  my_alert("API call: getAllPatients()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/doctor/patients", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

//(bonus point: sending automated email reports to a doctor about the health information of patients treated by her on a weekly basis, high priority events may be emailed in an emergency manner)

//4. Database administration –should be able to add/delete new users
//(bonus point: implement data security policy with suitable access control)
export const getUsers = async ({ username, password }) => {
  //wait for 1 second to simulate network latency
  console.log("API call: getUsers()");
  console.log(username, password);
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  console.log(json);
  return json;
};

export const addUser = async (
  adminUsername,
  adminPassword,
  username,
  password,
  name,
  email,
  type
) => {
  my_alert(adminUsername, adminPassword, username, password, name, email, type);
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(adminUsername + ":" + adminPassword),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      type: type,
      email: email,
    }),
  };
  console.log(config.body);
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  return json;
};

export const deleteUser = async (adminUsername, adminPassword, username) => {
  console.log(
    "API call: deleteUser(" + adminUsername + adminPassword + username + ")"
  );
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(adminUsername + ":" + adminPassword),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  };
  let response = await fetch(SERVER_URL + "/users/delete", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

// login("Admin", "pass").then((user) => {
//   console.log({ user });
//   getUsers(user).then((users) => {
//       deleteUser("Admin", "pass", "ad").then((res) => {
//       console.log(res);
//     });
//   });
// });

// login("Admin", "pass").then((user) => {
//   console.log({ user });
//   getUsers(user).then((users) => {
//     addUser(user.username, user.password, "ad", "pass","Name", "doctor").then(
//       (res) => {
//         console.log(res);
//       }
//     );
//   });
// });

// login("Prabitra", "pass").then((user) => {
//   console.log({user});
//   getAllPatients(user).then((patients) => {
//     console.log({patients});
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   registerPatient(user.username, user.password, "Saras").then((res) => {
//     console.log({res});
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let priority = 5;
//   let ID = 2;
//   let date = new Date().toJSON().slice(0, 10);
//   console.log({date});
//   scheduleAppointment(user.username, user.password, ID, date, priority).then(
//     (res) => {
//       console.log({ res });
//     }
//   );
// });

// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   getAppointments(user.username, user.password).then(
//     (res) => {
//       console.log({ res });
//     }
//   );
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let patient = 2;
//   let type = 'Large';
//   admitPatient(user.username, user.password, patient, type).then((res) => {
//     console.log({ res });
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let patient = 2;
//   dischargePatient(user.username, user.password, patient).then((res) => {
//     console.log({ res });
//   });
// });

// tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   let prescriptionId = 4;
//   let testName = "Blood_Test";
//   let date = new Date().toJSON().slice(0, 10);
//   let important = 1;
//   scheduleTest(
//     user.username,
//     user.password,
//     prescriptionId,
//     testName,
//     date,
//     important
//   ).then((res) => {
//     console.log({ res });
//   });
// });

// console.log("end of script");

//tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   let prescriptionId = 4;
//   let treatmentName = "Paracetamol";
//   let dosage = "one tablet after lunch and dinner";
//   let date = new Date().toJSON().slice(0, 10);
//   let important = 1;
//   treatment(
//     user.username,
//     user.password,
//     prescriptionId,
//     treatmentName,
//     dosage,
//     date
//   ).then((res) => {
//     console.log({ res });
//   });
// });

// export const treatment = async (
//   username,
//   password,
//   prescriptionId,
//   treatmentName,
//   dosage,
//   date
// ) => {
//   console.log("API call: scheduleTest()");
//   console.log({
//     username,
//     password,
//     prescriptionId,
//     treatmentName,
//     dosage,
//     date
//   });
//   let config = {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + encode(username + ":" + password),
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       prescriptionId,
//       treatmentName,
//       dosage,
//       date,
//     }),
//   };
//   // console.log("config", config);
//   let response = await fetch(SERVER_URL + "/treatment", config);
//   let json = await response.json();
//   console.log({ json });
//   return json;
// };
// console.log("end of script");

//tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   appointmentId = 5;
//   prescription(
//     user.username,
//     user.password,
//     appointmentId
//   ).then((res) => {
//     console.log({ res });
//   });
// });
// export const prescription = async (
//   username,
//   password,
//   appointmentId
// ) => {
//   console.log("API call: scheduleTest()");
//   console.log({
//     username,
//     password,
//     appointmentId
//   });
//   let config = {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + encode(username + ":" + password),
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       appointmentId,
//     }),
//   };
//   // console.log("config", config);
//   let response = await fetch(SERVER_URL + "/prescription", config);
//   let json = await response.json();
//   console.log({ json });
//   return json;
// };
// console.log("end of script");

//Doctor  should  be  able  to  record drugs/treatments prescribed to a patient.
// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   let patientId = 2;
//   getTreatment(
//     user.username,
//     user.password,
//     patientId
//   ).then((res) => {
//     console.log({ res });
//   });
// });
export const getTreatments = async (username, password, patientId) => {
  console.log("API call: getTreatments()");
  console.log({ username, password, patientId });
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId,
    }),
  };
  // console.log("config", config);
  let response = await fetch(SERVER_URL + "/getTreatment", config);
  let json = await response.json();
  console.log("treatments", { json });
  return json;
};
// console.log("end of script");

//Doctor  should  be  able  to  record tests prescribed to a patient.
// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   let patientId = 2;
//   getTest(
//     user.username,
//     user.password,
//     patientId
//   ).then((res) => {
//     console.log({ res });
//   });
// });

export const getTests = async (username, password, patientId) => {
  console.log("API call: getTests()");
  console.log({ username, password, patientId });
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId,
    }),
  };
  // console.log("config", config);
  let response = await fetch(SERVER_URL + "/getTest", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

// console.log("end of script");

export const fetchAdmissionHistory = async ({ username, password }) => {
  console.log("API call: fetchAdmissionHistory()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(SERVER_URL + "/getAdmissionHistory", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

export const fetchRescheduling = async ({ username, password }) => {
  console.log("API call: fetchRescheduling()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(SERVER_URL + "/getRescheduling", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

export const fetchTestUpdate = async ({ username, password }) => {
  console.log("API call: fetchTestUpdate()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(SERVER_URL + "/dataentry/test/update", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

export const fetchScheduleTest = async ({ username, password }) => {
  console.log("API call: fetchScheduleTest()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(SERVER_URL + "/getScheduleTest", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

export const fetchRescheduleTest = async ({ username, password }) => {
  console.log("API call: fetchRescheduleTest()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(SERVER_URL + "/getRescheduleTest", config);
  let json = await response.json();
  console.log({ json });
  return json;
};
