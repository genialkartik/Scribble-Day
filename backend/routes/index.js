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
  // s3.upload(params, (err, data) => {
  //   callback(err ? null : data.Location);
  // });
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
    console.log(req.body.formInput);
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
              respMessage: "Signup Successful",
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
    console.log(req.files);
    console.log(req.body);
    // find scribble to
    // const scribbleToUser = await User.findOne({
    //   email: req.body.scribbleToEmail,
    // });
    // if (scribbleToUser) {
    //   // upload scribble
    //   const [uploadedFront, uploadedBack] = new Promise.all(
    //     uploadToS2B(req.files[0].front),
    //     uploadToS2B(req.files[0].back)
    //   );
    //   console.log(uploadedFront);
    //   console.log(uploadedBack);
    //   if (uploadedFront && uploadedBack) {
    //     // save details in to scribbledBy
    //     const updateScribblee = await User.updateOne(
    //       { email: req.body.scribbleToEmail },
    //       {
    //         scribbleImageFront: uploadedFront,
    //         scribbleImageBack: uploadedBack,
    //         $push: {
    //           scribbledBy: {
    //             userId: scribbleToUser.userId,
    //             name: scribbleToUser.name,
    //             avatar: scribbleToUser.avatar,
    //           },
    //         },
    //       }
    //     );
    //     if (updateScribblee.nModified == 1) {
    //       res.json({
    //         saved: true,
    //         respMessage: "Scribble Saved",
    //       });
    //     } else {
    //       res.json({
    //         saved: false,
    //         respMessage: "Unable to Save Scribble",
    //       });
    //     }
    //   } else {
    //     res.json({
    //       saved: false,
    //       respMessage: "Scribble not uploaded",
    //     });
    //   }
    // } else {
    //   res.json({
    //     saved: false,
    //     respMessage: "User not found",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.json({
      saved: false,
      respMessage: "Something went wrongß",
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
      const imageLocation = await uploadToS3B(req.files.logo);
      if (imageLocation) {
        const newInstitute = new Institute({
          instituteId: uuidv4(),
          instituteName: req.body.name,
          instituteLogo: imageLocation,
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

module.exports = rtr;
