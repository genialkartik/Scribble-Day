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

rtr.get("/all/scribble", async (req, res) => {
  const resp = await Scribble.countDocuments();
  res.json({
    scribblesCount: resp ? resp : 0,
  });
});

rtr.get("/count/scribble", async (req, res) => {
  if (req.session.userdata) {
    const [received = 0, sent = 0] = await Promise.all([
      Scribble.countDocuments({
        sendToUserId: req.session.userdata.userId,
      }),
      Scribble.countDocuments({
        sendByUserId: req.session.userdata.userId,
      }),
    ]);
    res.json({
      received: received,
      sent: sent,
    });
  }
});

rtr.get("/scribbles/received", async (req, res) => {
  if (req.session.userdata) {
    const resp = await Scribble.find({
      sendToUserId: req.session.userdata.userId,
    });
    res.json({
      scribbleList: resp ? resp : [],
    });
  }
});

rtr.get("/scribbles/sent", async (req, res) => {
  if (req.session.userdata) {
    const resp = await Scribble.find({
      sendByUserId: req.session.userdata.userId,
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
    if (!req.files.avatar) {
      res.json({
        signUp: false,
        respMessage: "avatar file missing",
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        signUp: false,
        respMessage: "User with same email already exists",
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
          pin: formdata.pin.toString(),
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
    if (!req.session.userdata) {
      throw "Login first! by clicking on My Scribble";
    }
    const checkExistingScribble = await Scribble.findOne({
      sendByUserId: req.session.userdata.userId,
      sendToUserId: req.body.friendUserId,
    });
    if (checkExistingScribble)
      throw `You've already sent a Scribble to ${req.body.friendName}`;
    const newScribble = new Scribble({
      scribbleId: uuidv4(),
      sendByUserId: req.session.userdata.userId,
      sendByName: req.session.userdata.name,
      sendByAvatar: req.session.userdata.avatar,
      sendToUserId: req.body.friendUserId,
      sendToName: req.body.friendName,
      sendToAvatar: req.body.friendAvatar,
      sendToGender: req.body.friendGender,
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
    const universityExist = await Institute.findOne({ name: req.body.name });
    if (universityExist) {
      res.json({
        added: false,
        respMessage: "University with same name already exist",
      });
      return;
    }
    if (!req.files.logo) {
      res.json({
        added: false,
        respMessage: "University Logo not selected",
      });
      return;
    } else {
      req.files.logo.mv(
        __dirname + "/" + req.files.logo.name,
        async function (err) {
          if (err) throw err;
          else {
            mv(
              __dirname + "/" + req.files.logo.name,
              "build/images/" + req.files.logo.name.replace(/\s/g, ""),
              function (err) {
                if (err) throw err;
              }
            );
          }

          const newInstitute = new Institute({
            name: req.body.name,
            logo: "./images/" + req.files.logo.name.replace(/\s/g, ""),
          });
          const institute = await newInstitute.save();
          res.json({
            added: institute ? true : false,
            institute: institute ? institute : {},
            respMessage: "Saved",
          });
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

rtr.post("/scribble/delete", async (req, res) => {
  try {
    const resp = await Scribble.deleteOne({
      scribbleId: req.body.scribbleId,
    });
    console.log(resp);
    res.json({
      deleted: resp.deletedCount == 1 ? true : false,
      respMessage: resp.deletedCount == 1 ? "delete" : "error",
    });
  } catch (error) {
    res.json({
      deleted: false,
      respMessage: error,
    });
  }
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
          user: "foaxxofficial", // eg: "kartik@gmail.com" is email, then write "kartik" only
          pass: "Uninor@12", // password of the email
        },
      });
      var mailOptions = {
        from: "foaxxofficial@gmail.com", // enter complete email. eg: kartik@gmail.com
        to: req.body.email,
        subject: "Foaxx verification code",
        html: `￼
          
          `,
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
        user: "foaxxofficial",
        pass: "Uninor@12",
      },
    });
    var mailOptions = {
      from: "foaxxofficial@gmail.com",
      to: req.body.email,
      subject: "Scribble verification code",
      html: `
      
    <div
    style="
      background: #efefef;
      display: flex;
      font-family: Helvetica, sans-serif;
      text-align: center;
    "
  >
    <div
      style="
        background: #fff;
        width: 600px;
        height: 100%;
        padding: 10px 20px;
        margin: 0 auto;
      "
    >
      <div style="margin: 0px 0 44px 0">
        <a
          style="color: #009ac7; text-decoration: none"
          href="https://foaxx.com/"
          target="_blank"
          data-saferedirecturl="https://www.foaxx.com"
        >
          <img
            src="https://scribble2021.s3.ap-south-1.amazonaws.com/foaxxemailheader.png"
            style="
              vertical-align: middle;
              width: 100%;
              height: auto;
              max-width: 100%;
              border-width: 0;
            "
            alt="EthicalLearner"
            data-image-whitelisted=""
            class="CToWUd"
          />
        </a>
        <div>
          <div>
            <h1
              style="
                font-family: Verdana, Helvetica, sans-serif;
                font-weight: bold;
                font-size: 32px;
                line-height: 48px;
              "
            >
              Welcome to FOAXX
            </h1>
          </div>
        </div>
      </div>

      <div style="color: #96a2af">
        <div>
          <p style="font-size: 16px; margin-bottom: 16px; line-height: 24px">
            Thanks for celebrating Scribble Day with us.
          </p>
          <p
            style="
              color: #96a2af;
              font-size: 16px;
              margin-bottom: 16px;
              line-height: 24px;
            "
          >
            Kindly enter the Verification Code mentioned below to verify your account:
          </p>
          <strong style="font-size: 26px; color: rgb(41, 41, 41)">
            <span>${randomcode}</span>
          </strong>
          <p
            style="
              font-size: 16px;
              margin-bottom: 16px;
              margin-top: 36px;
              line-height: 24px;
              padding-inline: 40px;
            "
          >
            This Pandemic (Covid-19) already caused a lot of mishappening. We
            must stay safe, healthy and connected. Scribble Day is supposed to bring remarkable and
            unforgettable moments in our lives and so do this year's Virtual
            Scribble Day
          </p>
        </div>

        <p style="margin-top: 46px">
          <span style="line-height: 24px; font-size: 16px"
            >Happy Scribble Day</span
          ><br />
          <span style="line-height: 24px; font-size: 16px"
            >The FOAXX Team</span
          >
        </p>
      </div>

      <hr
        style="
          margin: 40px 0 20px 0;
          display: block;
          height: 1px;
          border: 0;
          border-top: 1px solid #c4cdd5;
          padding: 0;
        "
      />
      <footer style="color: #6d6d6d; background: #09203a; display: grid">
        <div style="text-align: center; margin: 30px 0">
          <div style="color: #a8adb2; font-size: 12px">
            <img
              src="
            https://scribble2021.s3.ap-south-1.amazonaws.com/foaxxlogo.png
            "
              style="
                vertical-align: middle;
                width: 80px;
                height: auto;
                max-width: 100px;
              "
              alt="EthicalLearner"
              data-image-whitelisted=""
              class="CToWUd"
            />
          </div>
          <p style="font-size: 12px">
            Empowered under the hood of Adorway Pvt. Ltd.
            <a
              href="https://adorway.com"
              style="font-size: 11px; font-weight: 300"
              target="_blank"
              data-saferedirecturl="https://adorway.com/"
              >@adorway</a
            >
          </p>
          <br />
          <p style="font-size: 12px">
            <em>Copyright © 2021 Adorway Pvt Ltd.</em>
          </p>
        </div>
      </footer>
      <div class="yj6qo"></div>
      <div class="adL"></div>
    </div>
    <div class="adL"></div>
  </div>
`,
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
