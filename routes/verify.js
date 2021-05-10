const rtr = require("express").Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/Users");

// NOTE:
// Make your email less secure, to use nodemailer.
// Link to make less secure: https://myaccount.google.com/u/0/lesssecureapps?pli=1&rapt=AEjHL4MiXjAmnxssNISAZTf3xDYb0jRwrSvvy8ltHNw2Zk0czfB3u7zk9KIcMBk9Za0-Itwes0x0Z-liKD7fZvwthz1j-15fDA

// to reset pin
rtr.post("/user/sendcode", async (req, res) => {
  try {
    const profileResp = await User.findOne({ email: req.body.email });
    if (profileResp) {
      var randomcode = Math.floor(100000 + Math.random() * 900000);
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        ignoreTLS: false,
        service: "gmail",
        auth: {
          user: "krtyagikr", // eg: "kartik@gmail.com" is email, then write "kartik" only
          pass: "8954191698", // password of the email
        },
      });
      var mailOptions = {
        from: "krtyagikr@gmail.com", // enter complete email. eg: kartik@gmail.com
        to: req.body.email,
        subject: "AreaGG verification code",
        html:
          "<div><b>We would like to verify your account." +
          "<br/>Kindly enter the below" +
          "Verification Code to verify your account to reset your password.</b><br/><br/>" +
          "Verification Code: " +
          randomcode +
          "</div>",
      };
      const info = await transporter.sendMail(mailOptions);
      if (info) {
        res.json({
          sent: true,
          codeToCheck: randomcode,
          respMessage: "Verification Code Sent",
        });
      } else {
        res.json({
          sent: false,
          codeToCheck: "",
          respMessage: "Something went wrong in sending verification code",
        });
      }
    } else {
      res.json({
        sent: false,
        codeToCheck: "",
        respMessage: "This email is not registered with us",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      sent: false,
      codeToCheck: "",
      respMessage: "Something went Wrong",
    });
  }
});

rtr.post("/user/reset-password", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.password) {
      res.json({
        updated: false,
        respMessage: "Insert valid Email",
      });
    }
    const profileResp = await User.updateOne(
      { email: req.body.email },
      {
        password: (await bcrypt.hash(req.body.password, 8)).toString(),
      }
    );
    if (profileResp.nModified == 1) {
      res.json({
        updated: true,
        respMessage: "Password set successfully",
      });
    } else {
      res.json({
        updated: false,
        respMessage: "Unable to Save",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      updated: false,
      respMessage: "Something went wrong",
    });
  }
});

// to verify account
rtr.post("/email/verify", async (req, res) => {
  try {
    var randomcode = Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "krtyagikr",
        pass: "8954191698",
      },
    });
    var mailOptions = {
      from: "krtyagikr@gmail.com",
      to: req.body.email,
      subject: "Scribble verification code",
      html:
        "<div><b>We would like to verify your account." +
        "<br/>Kindly enter the below" +
        "Verify your account to save your worth remembering day</b><br/><br/>" +
        "Verification Code: " +
        randomcode +
        "</div>",
    };
    const info = await transporter.sendMail(mailOptions);
    if (info) {
      res.json({
        sent: true,
        codeToCheck: randomcode,
        respMessage: "Verification Code Sent",
      });
    } else {
      res.json({
        sent: false,
        codeToCheck: "",
        respMessage: "Something went wrong in sending verification code",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      sent: false,
      codeToCheck: "",
      respMessage: "Something went Wrong",
    });
  }
});

module.exports = rtr;
