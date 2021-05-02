const rtr = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const mv = require("mv");
const AWS = require("aws-sdk");
const User = require("../models/Users");
const Institute = require("../models/Institutes");

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
            userId: uuidv4(),
            name: formdata.name,
            email: req.body.email,
            pin: formdata.pin,
            avatar: avatarLocation,
            university: formdata.university,
            gender: formdata.gender,
            scribbleImageFront:
              formdata.gender == "male"
                ? "https://scribble2021.s3.ap-south-1.amazonaws.com/male1.png"
                : ".https://scribble2021.s3.ap-south-1.amazonaws.com/female1.png",
            scribbleImageBack:
              formdata.gender == "male"
                ? "https://scribble2021.s3.ap-south-1.amazonaws.com/male2.png"
                : "https://scribble2021.s3.ap-south-1.amazonaws.com/female2.png",
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
              scribbleImageFront: newUserResp.scribbleImageFront,
              scribbleImageBack: newUserResp.scribbleImageBack,
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
      respMessage: "Something went Wrong",
    });
  }
});

rtr.post("/save/scribble", async (req, res) => {
  try {
    if (!req.session.userdata) {
      throw "Login first! by clicking on My Scribble";
    }
    const base64 = req.body.imageBase64;
    const base64Data = new Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = base64.split(";")[0].split("/")[1];
    let params = {};
    if (req.body.userId && req.body.side) {
      params = {
        Bucket: "scribble2021",
        Key: `scribbles/${req.body.userId}${req.body.side}.${type}`, // type is not required
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64", // required
        ContentType: `image/${type}`, // required. Notice the back ticks
      };
    } else {
      throw "Invalid Input";
    }
    const { Location } = await s3.upload(params).promise();
    console.log(Location);
    if (!Location) throw "Error in saving...";
    const updateResp = await User.updateOne(
      { userId: req.body.userId },
      req.body.side == "front"
        ? {
            scribbleImageFront: Location,
            $push: {
              scribbleBy: {
                userId: req.session.userdata.userId,
                name: req.session.userdata.name,
                avatar: req.session.userdata.avatar,
              },
            },
          }
        : {
            scribbleImageBack: Location,
            $push: {
              scribbleBy: {
                userId: req.session.userdata.userId,
                name: req.session.userdata.name,
                avatar: req.session.userdata.avatar,
              },
            },
          }
    );
    console.log(updateResp);
    if (updateResp.nModified == 1) {
      res.json({
        saved: true,
        respMessage: "saved",
      });
    } else {
      throw "Error updating";
    }
  } catch (error) {
    console.log(error);
    res.json({
      saved: false,
      respMessage: error,
    });
  }
});

rtr.post("/institute/add", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files.logo);
    if (!req.files.logo) {
      res.json({
        added: false,
        respMessage: "No file selected",
      });
    } else {
      const imageLocation = await uploadToS3B(req.files.logo);
      if (imageLocation) {
        const newInstitute = new Institute({
          name: req.body.name,
          logo: imageLocation,
        });
        const institute = await newInstitute.save();
        res.json({
          added: institute ? true : false,
          institute: institute ? institute : {},
          respMessage: "Saved",
        });
      } else {
        res.json({
          added: false,
          institute: {},
          respMessage: "Unable to upload Logo",
        });
      }
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
  res.json({
    friendsList: resp && resp.length > 0 ? resp : [],
  });
});

module.exports = rtr;
