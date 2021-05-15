const rtr = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const mv = require("mv");
const AWS = require("aws-sdk");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/Users");
const Institute = require("../models/Institutes");
const Scribble = require("../models/Scribbles");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAW54ITD376OQZGBVP",
  secretAccessKey: "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",
});

var s3 = new AWS.S3();

const uploadToS3B = async (file) => {
  var params = {
    Bucket: "scribble2021",
    Body: file.data,
    Key: file.name.replace(/\s/g, ""),
  };
  const resp = await s3.upload(params).promise();
  return resp ? resp.Location : null;
};

rtr.get("/check/session", async (req, res) => {
  res.json({
    userdata: req.session.userdata ? req.session.userdata : null,
  });
});

rtr.get("/get/scribbles", async (req, res) => {
  if (req.session.userdata) {
    const resp = await Scribble.find({
      sendToUserId: req.session.userdata.userId,
    });
    res.json({
      scribbleList: resp ? resp : [],
    });
  }
});

rtr.post("/friends/scribbles", async (req, res) => {
  const resp = await Scribble.find({ sendToUserId: req.body.userId });
  res.json({
    scribbleList: resp ? resp : [],
  });
});

rtr.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.pin);
    if (!user)
      return res.json({
        loggedIn: false,
        userdata: null,
        respMessage: "Invalid Email or PIN",
      });
    else {
      // save user into session
      req.session.userdata = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        university: user.university,
        gender: user.gender,
        scribbleImageFront: user.scribbleImageFront,
        scribbleImageBack: user.scribbleImageBack,
      };
      res.json({
        loggedIn: true,
        userdata: req.session.userdata ? req.session.userdata : null,
        respMessage: "Successfull",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      loggedIn: false,
      userdata: null,
      respMessage: "Something went Wrong",
    });
  }
});

// save Universities list
rtr.post("/profile", async (req, res) => {
  try {
    const profile = await User.findOne({ email: req.body.inputEmail });
    res.json({ profile: profile ? profile : null });
  } catch (error) {
    console.log(error);
    res.json({ profile: null, respMessage: "Profile not found!" });
  }
});

rtr.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        signUp: false,
        respMessage: "User with same email already exists",
      });
    } else {
      if (!req.files.avatar) {
        res.json({
          signUp: false,
          respMessage: "avatar file missing",
        });
      } else {
        const avatarLocation = await uploadToS3B(req.files.avatar);
        if (!avatarLocation) {
          res.json({
            signUp: false,
            respMessage: "Avatar not uploaded",
          });
        } else {
          const formdata = JSON.parse(req.body.formInput);
          const newUser = new User({
            // userId: uuidv4(),
            userId: Math.floor(100000 + Math.random() * 900000),
            name: formdata.name,
            email: req.body.email,
            pin: formdata.pin,
            avatar: avatarLocation,
            university: formdata.university,
            gender: formdata.gender,
            scribbledBy: [],
          });
          const newUserResp = await newUser.save();
          if (newUserResp) {
            req.session.userdata = {
              userId: newUserResp.userId,
              email: newUserResp.email,
              name: newUserResp.name,
              avatar: newUserResp.avatar,
              university: newUserResp.university,
              gender: newUserResp.gender,
            };
            res.json({
              signUp: true,
              respMessage: "Saved",
            });
          } else {
            res.json({
              signUp: false,
              respMessage: "Unable to Save",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      signUp: false,
      respMessage: "Something went Wrong, try again",
    });
  }
});

rtr.post("/save/scribble", async (req, res) => {
  try {
    // console.log(req.body);
    if (!req.session.userdata) {
      throw "Login first! by clicking on My Scribble";
    }
    const newScribble = new Scribble({
      scribbleId: uuidv4(),
      sendByUserId: req.session.userdata.userId,
      sendByName: req.session.userdata.name,
      sendByAvatar: req.session.userdata.avatar,
      sendToUserId: req.body.friendUserId,
      sendToName: req.body.friendName,
      sendToAvatar: req.body.friendAvatar,
      dimensions: req.body.dimensions,
      message: req.body.message,
      angle: req.body.angle,
      colorCode: req.body.colorCode,
      fontStyle: req.body.fontStyle,
      fontSize: req.body.fontSize,
      side: req.body.side,
    });
    const scribbleResp = await newScribble.save();
    res.json({
      scribbled: scribbleResp ? scribbleResp : null,
      respMessage: "saved",
    });
  } catch (error) {
    console.log(error);
    res.json({
      scribbled: null,
      respMessage: error,
    });
  }
});

rtr.post("/institute/add", async (req, res) => {
  try {
    if (!req.files.logo) {
      res.json({
        added: false,
        respMessage: "No file selected",
      });
    } else {
      // const imageLocation = await uploadToS3B(req.files.logo);
      req.files.logo.mv(
        __dirname + "/" + req.files.logo.name,
        async function (err) {
          if (err) throw err;
          else {
            mv(
              __dirname + "/" + req.files.logo.name,
              "client/build/images/" + req.files.logo.name.replace(/\s/g, ""),
              function (err) {
                if (err) throw err;
              }
            );
          }

          // if (imageLocation) {
          const newInstitute = new Institute({
            name: req.body.name,
            // logo: imageLocation,
            logo: "./images/" + req.files.logo.name.replace(/\s/g, ""),
          });
          const institute = await newInstitute.save();
          res.json({
            added: institute ? true : false,
            institute: institute ? institute : {},
            respMessage: "Saved",
          });
          // } else {
          //   res.json({
          //     added: false,
          //     institute: {},
          //     respMessage: "Unable to upload Logo",
          //   });
          // }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.json({
      added: false,
      institute: {},
      respMessage: "Unable to Save",
    });
  }
});

rtr.get("/institute/list", async (req, res) => {
  const respList = await Institute.find({});
  res.json({ instituteList: respList && respList.length > 0 ? respList : [] });
});

rtr.post("/friends/list", async (req, res) => {
  const resp = await User.find({ university: req.body.university });
  let respFilter = resp;
  if (req.session.userdata)
    respFilter = resp.filter(
      (scribble) => scribble.userId !== req.session.userdata.userId
    );
  res.json({
    friendsList: respFilter && respFilter.length > 0 ? respFilter : [],
  });
});

rtr.post("/university/detail", async (req, res) => {
  const resp = await Institute.findOne({ name: req.body.university });
  res.json({
    university: resp ? resp : {},
    respMessage: resp ? "" : "Error finding University",
  });
});

rtr.get("/logout", async (req, res) => {
  if (req.session.userdata) {
    req.session.destroy(() => {
      res.json({ loggedout: true });
    });
  } else {
    res.json({ loggedout: false });
  }
});

rtr.post("/friend/param", async (req, res) => {
  try {
    const friendResp = await User.findOne({ userId: req.body.userId });
    if (!friendResp) throw "User not found";
    const universityResp = await Institute.findOne({
      name: friendResp.university,
    });
    if (!universityResp) throw "User details not found";
    const scribbleResp = await Scribble.find({ sendToUserId: req.body.userId });

    res.json({
      university: universityResp ? universityResp : {},
      scribbles: scribbleResp && scribbleResp.length > 0 ? scribbleResp : [],
      friendData: friendResp ? friendResp : {},
      found: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      university: {},
      scribbles: [],
      friendData: {},
      respMessage: error,
      found: false,
    });
  }
});

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
