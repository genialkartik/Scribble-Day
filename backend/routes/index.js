const rtr = require("express").Router();
const { v4: uuidv4 } = require("uuid");
// const mv = require("mv");
const AWS = require("aws-sdk");
const User = require("../models/Users");

var s3 = new AWS.S3();

//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAW54ITD376OQZGBVP",
  secretAccessKey: "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",
});

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
    console.log(req.body);
    const profile = await User.findOne({ email: req.body.email });
    res.json({ profile: profile ? profile : null });
  } catch (error) {
    console.log(error);
    res.json({ profile: null, respMessage: "Profile not found!" });
  }
});

rtr.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        signUp: false,
        respMessage: "User with same email already exists",
      });
    } else {
      // req.files.avatar.mv(
      //   __dirname + `/${req.files.avatar.name}`,
      //   async function (err) {
      //     if (err) throw err;
      //     else {
      //       mv(
      //         __dirname + "/" + req.files.avatar.name,
      //         "client/public/assets/" +
      //           req.files.avatar.name.replace(/\s/g, ""),
      //         function (err) {
      //           if (err) throw err;
      //         }
      //       );
      //     }
      const newUser = new User({
        userId: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        pin: req.body.pin,
        // avatar: req.files.avatar.name.replace(/\s/g, ""),
        avatar: req.body.avatar,
        university: req.body.university,
        gender: req.body.gender,
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
      //   }
      // );
    }
  } catch (error) {
    console.log(error);
    res.json({
      signUp: false,
      respMessage: "Something went Wrong",
    });
  }
});

const uploadToS2B = async (file) => {
  // var params = {
  //   Bucket: "scribble2021",
  //   Body: req.files.,
  //   Key: file.name.replace(/\s/g, ""),
  // };
  // s3.upload(params, (err, data) => {
  //   callback(err ? null : data.Location);
  // });
  return {
    uploaded: true,
  };
};

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

module.exports = rtr;
