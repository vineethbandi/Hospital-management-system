import nodemailer from "nodemailer";
import moment from "moment";
const formatDate = (date) => {
  let d = moment(date);
  return d.format("YYYY-MM-DD");
};
function mailDoc(props) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rudrakpatratest@gmail.com",
      pass: "pfvlqifqghhxhoef",
    },
  });
  let testResult = "";
  props.test.forEach((test) => {
    testResult += `<p>Name: <b>${test.Name}</b>, Date: <b>${formatDate(test.Date)}</b>, Result: <b>${test.Result}</b></p>\n`;
  });

  let mailDetails = {
    from: "rudrakpatratest@gmail.com",
    to: props.email,
    subject: "Patient health report",
    text: "",
    html: `
    <p>Dear Dr. <b>${props.name}</b>,</p>
    <p>The report for the patient named <b>${props.pName}</b> with ID <b>'${props.patient}'</b> for the tests are as follows </p>
    ${testResult}
    <p>Regards</p>
    <p><b>PARAS</b> Hospital</p>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err, data);
      console.log({ mailDetails });
    } else {
      console.log({ props });
      console.log("Email sent successfully");
    }
  });
}

export default mailDoc;
