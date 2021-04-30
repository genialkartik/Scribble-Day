import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { blue } from "@material-ui/core/colors";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import announcement from "../../assets/announcement.png";
import "./home.css";
import { useScreenshot } from "use-screenshot-hook";
import Preview from "../preview";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

function Home() {
  const imageRef = useRef(null);
  const { image, takeScreenshot } = useScreenshot({ ref: imageRef });
  const classes = useStyles();
  const [userdata, setUserData] = useState(null);
  const [message, setMessage] = useState("Scribble Message");
  const [sendee, setSendee] = useState("Your Name");
  const [friendname, setFriendName] = useState("");
  const [messageColor, setMessageColor] = useState("#000000");
  const [rotateValue, setRotateValue] = useState(0);
  const [dragBool, setDragBool] = useState(false);
  const [messageFont, setMessageFont] = useState(".8em");

  const [gender, setGender] = useState("female");
  const [frontSide, setSide] = useState(true);

  const [openDownloadDialog, setDownloadDialog] = useState(false);
  const [openPreviewDialog, setPreviewDialog] = useState(false);
  const [downloadInput, setDownloadInput] = useState();
  const [insertVerifyCode, setInsertVerifyCode] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowShare, setAllowShare] = useState(false);
  const [clickedOnShareOrDownload, setSD] = useState("download");
  const [university, setUniversity] = React.useState("");

  // const [sendScribbleButtonBool, setSendScribbleButtonBool] = useState(true);
  const [landingPageBool, setLandingPageBool] = useState(false);
  const [userDetailsBool, setUserDetailsBool] = useState(false);
  const [enterEmailBool, setEnterEmailBool] = useState(false);
  const [
    askedForSendVerificationCode,
    setAskedForSendVerificationCode,
  ] = useState(false);
  const [enterPinOrCodeBool, setEnterPinOrCodeBool] = useState("pin");
  const [signupFormBool, setSignUpformBool] = useState(true);

  const [inputEmail, setInputEmail] = useState("");
  const [pinCodeToVerify, setPinCodeToVerify] = useState("");
  const [codeToCheck, setCodeToCheck] = useState("");
  const [signupFormInputs, setSignupFormInputs] = useState({});

  const handleMyScribbleClick = async () => {
    if (userdata) {
      // send to users details
      setUserDetailsBool(true);
      setLandingPageBool(false);
    } else {
      setLandingPageBool(false);
      setEnterEmailBool(true);
    }
  };

  const handleSendScribbleForm = async () => {
    if (userdata) {
      // save details to db
    } else {
      setLandingPageBool(false);
      setEnterEmailBool(true);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!inputEmail) alert("Insert Email");
    const resp = await axios.post("/email/verify", {
      email: inputEmail,
    });
    if (resp.data.sent) {
      setAskedForSendVerificationCode(false);
      setInsertVerifyCode(true);
      setEnterPinOrCodeBool("code");
      setCodeToCheck(resp.data.codeToCheck);
    } else {
      alert(resp.data.respMessage);
    }
  };

  const handleVerifyPin = async () => {
    if (!pinCodeToVerify) alert("Insert PIN to verify");
    else if (!inputEmail) alert("Insert Email first");
    else {
      const resp = await axios.post("/login", {
        email: inputEmail,
        pin: pinCodeToVerify,
      });
      if (resp.data.loggedIn) {
        setLandingPageBool(true);
        setInsertVerifyCode(false);
        setEnterPinOrCodeBool("pin");
        setUserData(resp.data.userdata ? resp.data.userdata : null);
      } else {
        alert(resp.data.respMessage);
      }
    }
  };

  const handleVerifyCode = async () => {
    if (!pinCodeToVerify) alert("Insert Code to verify");
    else if (!inputEmail) alert("Insert Email first");
    else {
      if (codeToCheck == pinCodeToVerify) {
        setInsertVerifyCode(false);
        setEnterPinOrCodeBool("");
        setSignUpformBool(true);
        setPinCodeToVerify("");
      } else {
        alert("Code not Match");
      }
    }
  };

  const checkUserAccountWithEmail = async () => {
    if (!inputEmail) alert("Insert Email");
    else {
      setEnterEmailBool(false);
      const resp = await axios.post("/profile", {
        inputEmail,
      });
      const res = resp.data;
      console.log(res);
      if (!res.profile) {
        setAskedForSendVerificationCode(true);
      } else {
        setEnterEmailBool(false);
        setInsertVerifyCode(true);
        setEnterPinOrCodeBool("pin");
      }
    }
  };

  const handleSubmitSignupForm = async () => {
    if (signupFormInputs == {}) {
      alert("Enter all Inputs");
    } else {
      const resp = await axios.post("/create", signupFormInputs);
      if (resp.data.signUp) {
        setSignUpformBool(false);
        setLandingPageBool(true);
      } else {
        alert(resp.data.respMessage);
      }
    }
  };

  const handleRotateChange = (event, newValue) => {
    setRotateValue(newValue);
  };
  const handleDownloadOpen = (downloadOrShare) => {
    takeScreenshot();
    setDownloadDialog(true);
    setSD(downloadOrShare);
  };

  const handleDownloadClose = (value) => {
    setDownloadDialog(false);
    setDownloadInput(value);
    setAllowDownload(false);
    setAllowShare(true);
  };
  const handlePreviewOpen = () => {
    setPreviewDialog(true);
  };

  const handlePreviewClose = () => {
    setPreviewDialog(false);
  };

  function PreviewDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const handlePreviewClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };
    return (
      <Dialog
        onClose={handlePreviewClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Preview />
      </Dialog>
    );
  }

  function DownloadForm(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, image, insertVerifyCode } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {image ? <img src={image} /> : <CircularProgress />}
      </Dialog>
    );
  }

  DownloadForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  return (
    <div className={"appbody"}>
      <Container fluid className={"nav center"}>
        <Row className={"container text-center"}>
          <Col>
            <img src={announcement} height="40px" alt="announcement" />{" "}
            &nbsp;Make your virtual Scribble Day more exciting by
            <a
              href="https://ethicallearner.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Placing ORDER of your SCRRIBLE TSHIRT
            </a>
          </Col>
        </Row>
      </Container>

      <div className={"main"}>
        <div className={"center scribble-imgbox"}>
          <div className="row" style={{ width: "100%" }}>
            <div className={"column"}>
              <div>
                <Image
                  style={{ left: 100 }}
                  src={require("../../assets/ScribbleDay.png")}
                  height="190px"
                />
              </div>
            </div>
            <div className={"column"}>
              <div className="details-of-site" style={{ marginTop: "50px" }}>
                <div className="part">
                  <ButtonGroup disableElevation aria-label="contained">
                    <Button
                      color="primary"
                      onClick={() => {
                        setSide(true);
                      }}
                    >
                      Front
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setSide(false);
                      }}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="part">
                  <ButtonGroup disableElevation variant="contained">
                    <Button
                      color="primary"
                      onClick={() => {
                        setGender("male");
                      }}
                    >
                      Male
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setGender("female");
                      }}
                    >
                      Female
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => handleDownloadOpen("download")}
                  style={{
                    backgroundColor: "#0A0",
                    marginInline: 10,
                    color: "#fff",
                  }}
                >
                  <span className={"fa fa-download"}></span>
                  Download
                </Button>
                <DownloadForm
                  insertVerifyCode={insertVerifyCode}
                  selectedValue={downloadInput}
                  open={openDownloadDialog}
                  onClose={handleDownloadClose}
                />
                <Button
                  variant="contained"
                  onClick={() => handlePreviewOpen("download")}
                  style={{
                    backgroundColor: "#05ABFF",
                    marginInline: 10,
                    color: "#fff",
                  }}
                >
                  <span className={"fa fa-user"}></span>
                  Preview
                </Button>
                <PreviewDialog
                  open={openPreviewDialog}
                  onClose={handlePreviewClose}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* LEFT COLUMN */}
          <div className={"column"}>
            <Form
              // onSubmit={handleSubmit}
              autoComplete="off"
              inline
              className={"row justify-content-center form1"}
            >
              <div className={"col-12 col-sm-10 col-lg-8 d-flex"}>
                <HomeIcon
                  onClick={() => {
                    setUserDetailsBool(false);
                    setEnterEmailBool(false);
                    setAskedForSendVerificationCode(false);
                    setLandingPageBool(true);
                  }}
                />
                <div className="formBox row align-items-center">
                  <hr />
                  {landingPageBool && (
                    <>
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="University Name"
                        name="message"
                        maxLength={250}
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                      />
                      <Avatar
                        style={{ marginLeft: 12 }}
                        alt="Remy Sharp"
                        src={require("../../assets/lpu.png")}
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Friend's Name"
                        name="friendname"
                        maxLength={250}
                        value={friendname}
                        onChange={(e) => setFriendName(e.target.value)}
                        required
                      />
                      <Avatar
                        style={{ marginLeft: 12 }}
                        alt="Remy Sharp"
                        src={require("../../assets/logo192.png")}
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Scribble Message"
                        name="message"
                        maxLength={250}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      <div>
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#f00000")}
                          style={{ color: "#f00000" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#07c603")}
                          style={{ color: "#07c603" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#05abff")}
                          style={{ color: "#05abff" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#ead300")}
                          style={{ color: "#ead300" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#ff8300")}
                          style={{ color: "#ff8300" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#9605ff")}
                          style={{ color: "#9605ff" }}
                        />
                        <FiberManualRecordIcon
                          onClick={() => setMessageColor("#ff05fa")}
                          style={{ color: "#ff05fa" }}
                        />
                        <div
                          className={"rotate-slider"}
                          style={{
                            position: "relative",
                            textAlign: "left",
                            top: 30,
                          }}
                        >
                          <Typography
                            gutterBottom
                            style={{ fontSize: "0.9em", color: "#FC88DF" }}
                          >
                            Rotate Scribble Message
                          </Typography>
                          <Slider
                            ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            value={rotateValue}
                            min={-180}
                            max={180}
                            style={{ color: "white" }}
                            onChange={handleRotateChange}
                          />
                        </div>
                      </div>

                      <Button
                        variant="contained"
                        onClick={handleSendScribbleForm}
                      >
                        Submit
                      </Button>
                      <div className="boxWrapper">
                        <Button
                          variant="contained"
                          onClick={handleMyScribbleClick}
                        >
                          My Scribble
                        </Button>
                      </div>
                    </>
                  )}
                  {userDetailsBool && userdata && (
                    <>
                      <div className="detailWrapper">
                        <label>Name</label>
                        <span>{userdata.name}</span>
                      </div>
                      <div className="detailWrapper">
                        <label>Email</label>
                        <span>{userdata.email}</span>
                      </div>
                      <div className="detailWrapper">
                        <label>Gender</label>
                        <span>{userdata.gender}</span>
                      </div>
                      <div className="detailWrapper">
                        <label>University</label>
                        <span>{userdata.university}</span>
                      </div>
                      <div className="part">
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#8A374A", color: "#fff" }}
                        >
                          <span className={"fa fa-instagram"}></span>
                          Instagram
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#2E73AD", color: "#fff" }}
                        >
                          <span className={"fa fa-linkedin"}></span>
                          LinkedIn
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#4095ED", color: "#fff" }}
                        >
                          <span className={"fa fa-facebook"}></span>
                          Facebook
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#05ABFF", color: "#fff" }}
                        >
                          <span className={"fa fa-twitter"}></span>
                          Twitter
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#0DC143", color: "#fff" }}
                        >
                          <span className={"fa fa-whatsapp"}></span>
                          WhatsApp
                        </Button>
                      </div>
                    </>
                  )}
                  {insertVerifyCode && (
                    <>
                      <FormControl
                        className={"col-12 col-sm-8 col-md-9 form"}
                        style={{ padding: 20 }}
                      >
                        <Input
                          style={{ color: "white" }}
                          id="input-with-icon-adornment"
                          placeholder={
                            enterPinOrCodeBool === "pin"
                              ? "Enter PIN"
                              : "Verification Code"
                          }
                          variant="filled"
                          onChange={(e) => setPinCodeToVerify(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment
                              position="end"
                              onClick={
                                enterPinOrCodeBool === "pin"
                                  ? handleVerifyPin
                                  : handleVerifyCode
                              }
                            >
                              <SendIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </>
                  )}
                  {askedForSendVerificationCode && (
                    <div className="boxWrapper">
                      <Button
                        variant="contained"
                        onClick={handleSendVerificationCode}
                      >
                        Send Verification Code
                      </Button>
                      <span class="previewText">to {inputEmail}</span>
                    </div>
                  )}
                  {enterEmailBool && (
                    <FormControl
                      className={"col-12 col-sm-8 col-md-9 form"}
                      style={{ padding: 20 }}
                    >
                      <Input
                        id="input-with-icon-adornment"
                        style={{ color: "white" }}
                        placeholder="Email"
                        variant="filled"
                        onChange={(e) => setInputEmail(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment
                            position="end"
                            onClick={checkUserAccountWithEmail}
                          >
                            <SendIcon style={{ cursor: "pointer" }} />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {signupFormBool && (
                    <>
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Fullname"
                        name="name"
                        maxLength={250}
                        value={signupFormInputs?.name}
                        onChange={(e) =>
                          setSignupFormInputs({ name: e.target.value })
                        }
                        required
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="University Name"
                        name="university"
                        maxLength={250}
                        value={signupFormInputs?.university}
                        onChange={(e) =>
                          setSignupFormInputs({ university: e.target.value })
                        }
                        required
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Gender"
                        name="gender"
                        value={signupFormInputs?.gender}
                        onChange={(e) =>
                          setSignupFormInputs({ gender: e.target.value })
                        }
                        required
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Enter a 4 digit's PIN"
                        name="pin"
                        maxLength={4}
                        value={signupFormInputs?.pin}
                        onChange={(e) =>
                          setSignupFormInputs({ pin: e.target.value })
                        }
                        required
                      />
                      <Form.Control
                        className={"col-12 col-sm-8 col-md-9 form"}
                        type="text"
                        placeholder="Avatar Link"
                        name="avatar"
                        value={signupFormInputs?.avatar}
                        onChange={(e) =>
                          setSignupFormInputs({ avatar: e.target.value })
                        }
                        required
                      />
                      <Button
                        variant="contained"
                        onClick={handleSubmitSignupForm}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Form>
            <h3
              className={"center text-center"}
              style={{
                color: "#FF8AE2",
                fontFamily: "sans",
                textAlign: "left",
              }}
            >
              A Day worth Remembering
            </h3>
            <div className="details-of-site">
              {/* Delete It later */}
              <div className="part">
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleDownloadOpen("download")}
                    style={{ backgroundColor: "#0A0", color: "#fff" }}
                  >
                    <span className={"fa fa-download"}></span>
                    Save
                  </Button>
                </div>
              </div>

              <div className="part">
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleDownloadOpen("download")}
                    style={{ backgroundColor: "#0A0", color: "#fff" }}
                  >
                    <span className={"fa fa-shopping-cart"}></span>
                    Place Order
                  </Button>
                  <DownloadForm
                    insertVerifyCode={insertVerifyCode}
                    selectedValue={downloadInput}
                    open={openDownloadDialog}
                    onClose={handleDownloadClose}
                  />
                </div>
              </div>
              <div className="part">
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleDownloadOpen("share")}
                    style={{ backgroundColor: "#05ABFF", color: "#fff" }}
                  >
                    <span className={"fa fa-share"}></span>
                    Share
                  </Button>
                  <DownloadForm
                    insertVerifyCode={insertVerifyCode}
                    selectedValue={downloadInput}
                    open={openDownloadDialog}
                    onClose={handleDownloadClose}
                    image={image}
                  />
                </div>
              </div>
            </div>

            <footer className={"center"} style={{ textAlign: "center" }}>
              <p>
                Spread the happiness among your friends, juniors, and
                connections to celebrate this year's <br />
                <a
                  href="https://hacktoberfest.digitalocean.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Scribble Day
                </a>
              </p>
            </footer>
          </div>
          <div className={"column"}>
            {/* RIGHT COLUMN */}

            <div className={"scribble-image1"} ref={imageRef}>
              {/* <h2
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "26%",
                  color: "#000",
                  zIndex: 1,
                }}
              >
                I am madan
              </h2> */}
              {gender === "female" ? (
                <Image
                  src={require(frontSide
                    ? "../../assets/femalefront.png"
                    : "../../assets/malefront.png")}
                  className={"male-front"}
                />
              ) : (
                <Image
                  src={require(frontSide
                    ? "../../assets/malefront.png"
                    : "../../assets/maleback.png")}
                  className={"male-front"}
                />
              )}
              <div className={"university-logo"}>
                <Image src={require("../../assets/lpu.png")} height="32px" />
              </div>
              <Draggable disabled={dragBool}>
                <div
                  className={"scribble-message1"}
                  style={
                    !dragBool
                      ? {
                          rotate: rotateValue + "deg",
                          backgroundColor: "#e5fcff",
                          border: "1px solid rgb(233, 233, 233)",
                        }
                      : {
                          border: "none",
                          rotate: "90deg",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  <div
                    style={{
                      color: messageColor,
                      fontSize: messageFont,
                      cursor: dragBool ? "default" : "move",
                    }}
                  >
                    <p>
                      {message}
                      <span>
                        <br />~ {sendee}
                      </span>
                    </p>
                  </div>
                  {!dragBool ? (
                    <>
                      <div
                        className={"actions"}
                        onClick={() => {
                          setDragBool(true);
                        }}
                      >
                        fix
                      </div>
                      <div
                        className={"actions"}
                        onClick={() => setMessageFont(".4em")}
                      >
                        1
                      </div>
                      <div
                        className={"actions"}
                        onClick={() => setMessageFont(".5em")}
                      >
                        2
                      </div>
                      <div
                        className={"actions"}
                        onClick={() => setMessageFont(".6em")}
                      >
                        3
                      </div>
                      <div
                        className={"actions"}
                        onClick={() => setMessageFont(".7em")}
                      >
                        4
                      </div>
                    </>
                  ) : (
                    <div
                      className={"actions"}
                      onClick={() => {
                        setDragBool(false);
                        setMessageFont(".9em");
                      }}
                    >
                      <AutorenewIcon style={{ fontSize: "0.9em" }} />
                    </div>
                  )}
                </div>
              </Draggable>
            </div>

            {/* remove draggable from here to above */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
