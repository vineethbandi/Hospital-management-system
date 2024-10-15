import nodemailer from "nodemailer";
import moment from "moment";

function weeklyMail(props) {
  const formatDate = (date) => {
    let d = moment(date);
    return d.format("YYYY-MM-DD");
  };

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rudrakpatratest@gmail.com",
      pass: "pfvlqifqghhxhoef",
    },
  });

  // send email every week on Monday at 10:00 AM
  setInterval(() => {
    let now = new Date();
    // console.log({ now });
    // get date of last week
    if (now.getDay() === 1 && now.getHours() === 10 && now.getMinutes() === 0) {
      now.setDate(now.getDate() - 7);
      console.log({ now });
      // sql query to get the reports of all the patients of the doctor
      let sql = `SELECT Appointment.Doctor, User.Email, Appointment.Patient as pID, Patient.Name as pName, Test.Name as tName, Test.Result, Test.Date 
      FROM Appointment
      JOIN Prescription_Test ON Appointment.Prescription = Prescription_Test.ID
      JOIN Test ON Prescription_Test.Test = Test.ID
      JOIN Patient ON Appointment.Patient = Patient.ID
      JOIN User ON Appointment.Doctor = User.Username
      WHERE Test.Date > '${formatDate(now)}'
      ORDER BY Appointment.Doctor, Test.Date`;
      props.connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const docs = {};
          for (const row of result) {
            console.log(row);
            const value = row.Doctor;
            if (!docs[value]) {
              docs[value] = [];
            }
            docs[value].push(row);
          }
          for (const key in docs) {
            let testResult = "";
            docs[key].forEach((test) => {
              testResult += `<p>Patient Name: <b>${
                test.pName
              }</b>, Patient ID: <b>${test.pID}</b>, Test Name: <b>${
                test.tName
              }</b>, Date: <b>${formatDate(test.Date)}</b>, Result: <b>${
                test.Result
              }</b></p>\n`;
            });
            let mailDetails = {
              from: "rudrakpatratest@gmail.com",
              to: docs[key][0].Email,
              subject: "Paitient health report",
              text: "Weekly report of your patients' test result is:",
              html: testResult,
            };
            mailTransporter.sendMail(mailDetails, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        }
      });
    }
  }, 60000); // check every minute
}

export default weeklyMail;
