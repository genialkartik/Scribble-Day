import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Popover from "@material-ui/core/Popover";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from "@material-ui/core/Snackbar";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { blue } from "@material-ui/core/colors";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import announcement from "../../assets/announcement.png";
import "./home.css";
import { useScreenshot } from "use-screenshot-hook";
import Preview from "../preview";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "#fff",
    borderColor: "#fff",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  resultOfUlist: {
    top: 38,
    position: "absolute",
    zIndex: 1,
    background: "#fff",
    color: "#000",
    width: "100%",
    maxHeight: 160,
    overflow: "hidden",
    overflowY: "auto",
  },
  resultListItem: {
    padding: "6px 12px",
    borderBottom: "1px solid #ccc",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#bbb",
    },
  },
}));

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
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [duniversityList, setDUniversityList] = useState([
    { name: "IIT Delhi" },
    { name: "Poornima University" },
  ]);
  const [dfriendList, setDFriendList] = useState([
    { name: "Ramesh" },
    { name: "Dooper" },
  ]);
  const [universityList, setUniversityList] = useState([
    { name: "IIT Delhi" },
    { name: "Poornima University" },
  ]);
  const [friendList, setFriendList] = useState([
    { name: "Ramesh" },
    { name: "Dooper" },
  ]);
  const searchFilterFunction = (text, data, setData) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(data);
    }
  };
  const [isFriendFocus, setFriendInput] = useState(false);
  const [isUlistFocus, setUlistInput] = useState(false);
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
  const [isFixed, setIsFixed] = useState(false);

  const [openDownloadDialog, setDownloadDialog] = useState(false);
  const [openPreviewDialog, setPreviewDialog] = useState(false);
  const [downloadInput, setDownloadInput] = useState();
  const [insertVerifyCode, setInsertVerifyCode] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowShare, setAllowShare] = useState(false);
  const [clickedOnShareOrDownload, setSD] = useState("download");
  const [university, setUniversity] = useState("");

  // const [sendScribbleButtonBool, setSendScribbleButtonBool] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const [landingPageBool, setLandingPageBool] = useState(true);
  const [userDetailsBool, setUserDetailsBool] = useState(false);
  const [enterEmailBool, setEnterEmailBool] = useState(false);
  const [
    askedForSendVerificationCode,
    setAskedForSendVerificationCode,
  ] = useState(false);
  const [enterPinOrCodeBool, setEnterPinOrCodeBool] = useState("pin");
  const [signupFormBool, setSignUpformBool] = useState(false);
  const [newUniversityBool, setNewUniversityBool] = useState(false);

  const [inputEmail, setInputEmail] = useState("");
  const [pinCodeToVerify, setPinCodeToVerify] = useState("");
  const [codeToCheck, setCodeToCheck] = useState("");
  const [signupFormInputs, setSignupFormInputs] = useState({});
  const [activateLoadingIn, setActivateLoadingIn] = useState("");
  const [newUnivesityName, setNewUniversityName] = useState("");
  const [newUnivesityLogo, setNewUniversityLogo] = useState();
  const [avatar, setAvatar] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopOverClose = () => {
    setAnchorEl(null);
  };
  const popOverOpen = Boolean(anchorEl);
  const popOverId = popOverOpen ? "simple-popover" : undefined;

  useEffect(() => {
    (async () => {
      const resp = await axios.get("/check/session");
      if (resp.data && resp.data.userdata) {
        setUserData(resp.data.userdata);
      }
    })();
  }, [landingPageBool]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormInputs({
      ...signupFormInputs,
      [name]: value,
    });
  };

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
    console.log(userdata);
    if (userdata) {
      // save details to db
    } else {
      setLandingPageBool(false);
      setEnterEmailBool(true);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!inputEmail) alert("Insert Email");
    else {
      setActivateLoadingIn("send-verification-code");
      const resp = await axios.post("/email/verify", {
        email: inputEmail,
      });
      setActivateLoadingIn("");
      if (resp.data.sent) {
        setAskedForSendVerificationCode(false);
        setInsertVerifyCode(true);
        setEnterPinOrCodeBool("code");
        setCodeToCheck(resp.data.codeToCheck);
      } else {
        alert(resp.data.respMessage);
      }
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
    if (signupFormInputs == {} || signupFormInputs.university === "other") {
      setOpenSnackbar(true);
      setMsgSnackbar("Enter all Inputs");
      setTimeout(() => setOpenSnackbar(false), 3000);
    } else {
      let formData = new FormData();
      formData.set("formInput", JSON.stringify(signupFormInputs));
      formData.set("avatar", avatar);
      formData.set("email", inputEmail);
      const resp = await axios.post("/create", formData);

      setOpenSnackbar(true);
      setMsgSnackbar(resp.data.respMessage);
      setTimeout(() => setOpenSnackbar(false), 3000);
      if (resp.data.signUp) {
        setSignUpformBool(false);
        setLandingPageBool(true);
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

  const handleNewUniversityForm = async () => {
    if (!newUnivesityName || !newUnivesityLogo) {
      setOpenSnackbar(true);
      setMsgSnackbar("Fill all required Inputs");
      setTimeout(() => setOpenSnackbar(false), 3000);
    } else {
      const formData = new FormData();
      formData.set("name", newUnivesityName);
      formData.set("logo", newUnivesityLogo);
      const resp = await axios.post("/institute/add", formData);
      setOpenSnackbar(true);
      setTimeout(() => setOpenSnackbar(false), 3000);
      setMsgSnackbar(resp.data.respMessage);
      if (resp.data.added) {
        setNewUniversityBool(false);
      }
    }
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
                    <Button color="primary">Send Scribble</Button>
                  </ButtonGroup>
                </div>
              </div>

              <div
                style={{ textAlign: "center" }}
                className="d-none d-sm-block"
              >
                <Button
                  variant="contained"
                  onClick={() => handleDownloadOpen("download")}
                  style={{
                    backgroundColor: "#0A0",
                    marginInline: 10,
                    padding: 11,
                    color: "#fff",
                  }}
                >
                  <span className={"fa fa-download"}></span>
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

        <div className="row mb-view">
          {/* LEFT COLUMN */}
          <div className={"column"}>
            <div className={"row justify-content-center form1"}>
              <div className={"col-12 col-sm-10 col-lg-8 d-flex flex-column"}>
                <div style={{ padding: "1rem" }}>
                  <HomeIcon
                    onClick={() => {
                      setUserDetailsBool(false);
                      setEnterEmailBool(false);
                      setAskedForSendVerificationCode(false);
                      setLandingPageBool(true);
                      setSignUpformBool(false);
                    }}
                  />
                </div>
                <div className="formBox row align-items-center">
                  <hr />
                  {landingPageBool && (
                    <>
                      <div className="formAvatarGroup col-12 col-sm-8 col-md-9">
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            className={" form"}
                            type="text"
                            placeholder="University Name"
                            name="message"
                            maxLength={250}
                            value={university}
                            onFocus={() => setUlistInput(true)}
                            onBlur={() => setUlistInput(false)}
                            onChange={(e) => {
                              setUniversity(e.target.value);
                              searchFilterFunction(
                                e.target.value,
                                duniversityList,
                                setUniversityList
                              );
                            }}
                            required
                          />
                          <div className={classes.resultOfUlist}>
                            {isUlistFocus &&
                              (universityList.length > 0 ? (
                                universityList.map((uObj) => (
                                  <div className={classes.resultListItem}>
                                    {uObj.name}
                                  </div>
                                ))
                              ) : (
                                <div></div>
                              ))}
                          </div>
                        </div>
                        <Avatar
                          style={{ marginLeft: 12 }}
                          alt="Remy Sharp"
                          src={require("../../assets/lpu.png")}
                        />
                      </div>
                      <div className="formAvatarGroup col-12 col-sm-8 col-md-9">
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            className={" form"}
                            type="text"
                            placeholder="Friend's Name"
                            name="friendname"
                            maxLength={250}
                            col-12
                            col-sm-8
                            col-md-9
                            value={friendname}
                            onFocus={() => setFriendInput(true)}
                            onBlur={() => setFriendInput(false)}
                            onChange={(e) => {
                              setFriendName(e.target.value);
                              searchFilterFunction(
                                e.target.value,
                                dfriendList,
                                setFriendList
                              );
                            }}
                            required
                          />
                          <div className={classes.resultOfUlist}>
                            {isFriendFocus &&
                              (friendList.length > 0 ? (
                                friendList.map((uObj) => (
                                  <div className={classes.resultListItem}>
                                    {uObj.name}
                                  </div>
                                ))
                              ) : (
                                <div></div>
                              ))}
                          </div>
                        </div>
                        <Avatar
                          style={{ marginLeft: 12 }}
                          alt="Remy Sharp"
                          src={require("../../assets/logo192.png")}
                        />
                      </div>
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
                            margin: "1rem 0",
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0 12px",
                        }}
                      >
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel
                            color="primary"
                            classes={{
                              outlined: { color: "#fff" },
                            }}
                            id="demo-simple-select-outlined-label"
                            style={{ color: "#ddd" }}
                          >
                            Select Font
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={age}
                            onChange={handleChange}
                            label="Font"
                            style={{
                              backgroundColor: "#1A354E",
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          disabled={isFixed ? false : true}
                          onClick={() => {
                            if (
                              window.confirm(
                                "You will not be able to edit furthur. Are you sure to continue?"
                              )
                            ) {
                              handleSendScribbleForm();
                            }
                          }}
                          style={{
                            backgroundColor: "#1A354E",
                            color: isFixed ? "#fff" : "#aaa",
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 1,
                          margin: "12px 0 16px",
                          backgroundColor: "#ccc",
                        }}
                      />
                      <div className="boxWrapper">
                        <Button
                          variant="contained"
                          onClick={handleMyScribbleClick}
                          style={{ backgroundColor: "#ED72C0", color: "#fff" }}
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
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#2E73AD", color: "#fff" }}
                        >
                          <span className={"fa fa-linkedin"}></span>
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#4095ED", color: "#fff" }}
                        >
                          <span className={"fa fa-facebook"}></span>
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#05ABFF", color: "#fff" }}
                        >
                          <span className={"fa fa-twitter"}></span>
                        </Button>
                        <Button
                          variant="contained"
                          // onClick={() => handleDownloadOpen("share")}
                          style={{ backgroundColor: "#0DC143", color: "#fff" }}
                        >
                          <span className={"fa fa-whatsapp"}></span>
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
                        {activateLoadingIn === "send-verification-code" ? (
                          <CircularProgress size={25} />
                        ) : (
                          "Send Verification Code"
                        )}
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
                      <div className="col-12 col-sm-11 col-lg-9 row">
                        {!newUniversityBool ? (
                          <>
                            <FormControl
                              variant="filled"
                              className={classes.formControl}
                            >
                              <InputLabel
                                id="demo-simple-select-filled-label"
                                style={{ color: "white" }}
                              >
                                Select University
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                name="university"
                                value={signupFormInputs.university}
                                onChange={handleInputChange}
                              >
                                <MenuItem value={"lpu"}>LPU</MenuItem>
                                <MenuItem value={"Amity"}>Amity</MenuItem>
                                <MenuItem
                                  value={"other"}
                                  onClick={() => {
                                    setNewUniversityBool(true);
                                  }}
                                >
                                  Other
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <Form.Control
                              className={"col-12 form"}
                              type="text"
                              placeholder="Your fullname"
                              name="name"
                              maxLength={250}
                              name="name"
                              value={signupFormInputs.name}
                              onChange={handleInputChange}
                              required
                            />

                            <FormControl component="fieldset">
                              <FormLabel component="legend">Gender</FormLabel>
                              <RadioGroup
                                aria-label="gender"
                                name="gender"
                                value={signupFormInputs.gender}
                                onChange={handleInputChange}
                              >
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                              </RadioGroup>
                            </FormControl>
                            <Form.Control
                              className={"col-12 form"}
                              type="text"
                              placeholder="Enter a 4 digit's PIN"
                              name="pin"
                              value={signupFormInputs.pin}
                              onChange={handleInputChange}
                              maxLength={4}
                              required
                            />

                            <input
                              type="file"
                              accept="image/*"
                              hidden="true"
                              onChange={(e) => setAvatar(e.target.files[0])}
                              id="avatar"
                            />
                            <label for="avatar">
                              <div className="file-upload-control">
                                <CloudUploadIcon />
                                <span>upload profile picture</span>
                              </div>
                            </label>
                            <Button
                              variant="contained"
                              onClick={handleSubmitSignupForm}
                            >
                              Submit
                            </Button>
                          </>
                        ) : (
                          <>
                            <Form.Control
                              className={"col-12 form"}
                              type="text"
                              placeholder="Univesity Name"
                              name="newuniversity"
                              maxLength={250}
                              value={newUnivesityName}
                              onChange={(e) =>
                                setNewUniversityName(e.target.value)
                              }
                              required
                            />
                            <input
                              type="file"
                              accept="image/*"
                              hidden="true"
                              onChange={(e) =>
                                setNewUniversityLogo(e.target.files[0])
                              }
                              id="newuniversitylogo"
                            />
                            <label for="newuniversitylogo">
                              <div className="file-upload-control">
                                <CloudUploadIcon />
                                <span>Upload Logo</span>
                              </div>
                            </label>

                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNewUniversityForm}
                            >
                              Save
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{ textAlign: "center", marginBottom: "1rem" }}
              className="d-block d-sm-none"
            >
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
              <div className="part">
                <div>
                  <a
                    href={"https://rzp.io/l/Up18AjAWH"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleDownloadOpen("download")}
                      style={{ backgroundColor: "#0A0", color: "#fff" }}
                    >
                      <span className={"fa fa-shopping-cart"}></span>
                      Place Order
                    </Button>
                  </a>
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

            <footer
              className={"center"}
              style={{ textAlign: "center", padding: "0 2rem" }}
            >
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
                          rotate: rotateValue + "deg",
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
                        onClick={(e) => {
                          setDragBool(true);
                          setIsFixed(true);
                          // handlePopOverClick(e);
                          setAnchorEl(e.currentTarget);
                          console.log(e.currentTarget);
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
                        setIsFixed(false);
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        message={msgSnackbar}
      />
      <Popover
        id={popOverId}
        open={popOverOpen}
        anchorEl={anchorEl}
        onClose={handlePopOverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  );
}
export default Home;
