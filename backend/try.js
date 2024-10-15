import moment from "moment";
import nodemailer from "nodemailer";

// create reusable transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rudrakpatratest@gmail.com",
    pass: "pfvlqifqghhxhoef",
  },
});

// configure email message
let mailOptions = {
  from: "rudrakpatratest@gmail.com",
  to: "atishayjain002@gmail.com",
  subject: "Weekly Reminder",
  text: "This is a reminder email sent to you on a weekly basis.",
};

console.log("This message is logged every minute");

// send email every week on Monday at 9:00 AM
setInterval(() => {
  let now = new Date();
  console.log(now.getDay());
  console.log(now.getHours());
  console.log(now.getMinutes());
  if (now.getDay() === 0 && now.getHours() === 17 && now.getMinutes() === 40) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}, 60000); // check every minute

// log a message to the console every hour
setInterval(() => {
  console.log("This message is logged every hour");
}, 3600); // 3600000 milliseconds = 1 hour
