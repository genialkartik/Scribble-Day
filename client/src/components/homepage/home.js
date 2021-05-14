import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Draggable from "react-draggable";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import HelpIcon from "@material-ui/icons/Help";
import SecurityIcon from "@material-ui/icons/Security";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InfoIcon from "@material-ui/icons/Info";
import CardHeader from "@material-ui/core/CardHeader";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
import { Form, Image, Row, Col } from "react-bootstrap";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ShareCard from "./shareCard.js";
import { getFontSize } from "../useGetPosition";
import useWindowDimensions from "../dimension";
import { useScreenshot } from "use-screenshot-hook";
import useOutsideAlerter from "../useOutsideCatcher";
import "./home.css";
import SuperHeader from "../includes/superHeader";
import OrderCard from "./orderCard.js";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  formControl: {
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
    minWidth: 120,
    color: "#fff",
    borderColor: "#fff",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  resultOfUlist: {
    top: 61,
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
  // refs for checking focused or blured inputs
  const searchUniversityRef = useRef(null);
  const searchFriendRef = useRef(null);
  const isSearchUniversityFocused = useOutsideAlerter(searchUniversityRef);
  const isSearchFriendFocused = useOutsideAlerter(searchFriendRef);

  const classes = useStyles();
  const imageRef = React.createRef(null);
  const [imageRefWidth, setImageRefWidth] = useState(0);
  const [imageRefHeight, setImageRefHeight] = useState(0);
  const messageRef = React.createRef(null);
  const imageWrap = useRef(null);
  const { image, takeScreenshot } = useScreenshot({ ref: imageWrap });
  const { width: windowWidth } = useWindowDimensions();

  const handleFontChange = (event) => {
    setFontFam(event.target.value);
  };
  const [duniversityList, setDUniversityList] = useState([]);
  const [dfriendList, setDFriendList] = useState([]);
  const [universityList, setUniversityList] = useState([]);
  const [friendList, setFriendList] = useState([]);
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
  const [isFriendFocus, setFriendFocus] = useState(false);
  const [isUlistFocus, setUlistFocus] = useState(false);
  const [scribbleList, setScribbleList] = useState([]);
  const [userdata, setUserData] = useState(null);
  const [friendData, setFriendData] = useState(null);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#000000");
  const [rotateValue, setRotateValue] = useState(0);
  const [dragBool, setDragBool] = useState(false);
  const [messageFont, setMessageFont] = useState(".8em");
  const [fontFam, setFontFam] = useState("Jazz LET, fantasy");

  const [tshirtSide, setTshirtSide] = useState("front");
  const [isFixed, setIsFixed] = useState(false);
  const [dimensions, setDimensions] = useState({});

  const [openInviteDialog, setInviteDialog] = useState(false);
  const [openPlaceOrderDialog, setPlaceOrderDialog] = useState(false);
  const [openDownloadDialog, setDownloadDialog] = useState(false);
  const [downloadInput, setDownloadInput] = useState();
  const [insertVerifyCode, setInsertVerifyCode] = useState(false);
  const [university, setUniversity] = useState("");
  const [universityLogo, setUniversityLogo] = useState();
  const [enterFriendName, setEnterFriendName] = useState("");
  const [friendLogo, setFriendLogo] = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const [landingPageBool, setLandingPageBool] = useState(true);
  const [userDetailsBool, setUserDetailsBool] = useState(false);
  const [enterEmailBool, setEnterEmailBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(false);
  const [loadingFor, setLoadingFor] = useState("");
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [askedForSendVerificationCode, setAskedForSendVerificationCode] =
    useState(false);
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
  const [newUniversityOnSuccess, setNewUniversityOnSuccess] =
    useState("signup");
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setImageRefWidth(imageRef.current.getBoundingClientRect().width);
    setImageRefHeight(imageRef.current.getBoundingClientRect().height);
  }, [imageRef, imageRef.current, windowWidth]);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      (async () => {
        const resp = await axios.get("/friend/param", {
          userId: userId,
        });
        if (resp.data && resp.data.found) {
          const res = resp.data;
          setUniversity(res.university.name);
          setUniversityLogo(res.university.logo);
          setEnterFriendName(res.friendData.name);
          setFriendLogo(res.friendData.avatar);
          setFriendData({
            friendUserId: res.friendData.userId,
            friendName: res.friendData.name,
            friendAvatar: res.friendData.avatar,
          });
          setScribbleList(res.scribbles);
        } else {
          setFriendData(null);
          setOpenSnackbar(true);
          setMsgSnackbar(resp.data.respMessage);
          setTimeout(() => {
            setOpenSnackbar(false);
            window.location.replace("/");
          }, 2000);
        }
      })();
    }

    (async () => {
      const resp = await axios.post("/check/session");
      if (resp.data && resp.data.userdata) {
        setUserData(resp.data.userdata);
      }
    })();

    // fecth university list
    (async () => {
      const resp = await axios.post("/institute/list");
      if (resp.data && resp.data.instituteList) {
        setUniversityList(
          resp.data.instituteList.length > 0 ? resp.data.instituteList : []
        );
        setDUniversityList(
          resp.data.instituteList.length > 0 ? resp.data.instituteList : []
        );
      }
    })();
  }, [landingPageBool]);

  const handleFixClick = () => {
    if (!friendData) {
      setOpenSnackbar(true);
      setMsgSnackbar("Please Select a Friend and write a Scribble message");
      setTimeout(() => setOpenSnackbar(false), 3000);
    } else {
      setDimensions(
        GetPosition(
          imageRef.current.getBoundingClientRect(),
          messageRef.current.getBoundingClientRect()
        )
      );
      setDragBool(true);
      setIsFixed(true);
    }
  };

  function GetPosition(rootDimensions, selfDimensions) {
    const rootWidth = rootDimensions.width;
    const rootHeight = rootDimensions.height;
    const rootX = rootDimensions.x;
    const rootY = rootDimensions.y;
    const selfWidth = selfDimensions.width;
    const selfX = selfDimensions.x;
    const selfY = selfDimensions.y;

    const xHelperConstant = (selfX - rootX) / rootWidth - 0.0001864 * rootWidth;
    const yHelperConstant = (selfY - rootY) / rootWidth - 0.0002864 * rootWidth;
    const left = (100 / rootWidth) * (selfX - rootX) + 3;
    const top = (100 / rootHeight) * (selfY - rootY);

    return {
      xHelperConstant,
      yHelperConstant,
      left,
      top,
    };
  }

  const download = (imageUrl) => {
    console.log(imageUrl);
    if (imageUrl) {
      const url = imageUrl;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "scribble.png"); //or any other extension
      document.body.appendChild(link);
      link.click();
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormInputs({
      ...signupFormInputs,
      [name]: value,
    });
  };

  const handleMyScribbleClick = async () => {
    setLandingPageBool(false);
    setEnterFriendName("");
    if (userdata) {
      setLoadingBool(true);
      setUserDetailsBool(true);
      const scribbleResp = await axios.post("/get/scribbles");
      if (scribbleResp.data) {
        setScribbleList(scribbleResp.data.scribbleList);
      }
      setLoadingBool(false);
      const universityResp = await axios.get("/university/detail", {
        university: userdata.university,
      });
      if (universityResp.data) {
        setUniversityLogo(universityResp.data.university.logo);
      }
    } else {
      setEnterEmailBool(true);
    }
  };

  const handleSendScribbleForm = async () => {
    if (userdata) {
      if (friendData && message && dimensions) {
        setLoadingBool(true);
        // save scribble message to db
        if (friendData.friendName === userdata.name) {
          setUserDetailsBool(false);
          setEnterEmailBool(false);
          setAskedForSendVerificationCode(false);
          setLandingPageBool(true);
          setSignUpformBool(false);
          setNewUniversityBool(false);
          setEnterPinOrCodeBool(false);
          setScribbleList([]);
          setInsertVerifyCode(false);
          setFriendFocus(false);
          setUlistFocus(false);
          setFriendData(null);
          setEnterFriendName("");
          setFriendLogo();
          setUniversityLogo();
          setUniversity("");
          setMessage("");
          setOpenSnackbar(true);
          setMsgSnackbar("You cannot send scribble message to yourself");
          setTimeout(() => setOpenSnackbar(false), 3000);
        } else {
          const resp = await axios.get("/save/scribble", {
            friendUserId: friendData.friendUserId,
            friendName: friendData.friendName,
            friendAvatar: friendData.friendAvatar,
            dimensions,
            message,
            angle: rotateValue,
            colorCode: messageColor,
            fontStyle: fontFam,
            fontSize: messageFont,
            side: tshirtSide,
          });
          setLoadingBool(false);
          setOpenSnackbar(true);
          setTimeout(() => setOpenSnackbar(false), 1000);
          if (resp.data && resp.data.scribbled) {
            setMsgSnackbar("Send Scribble Successfully");
          } else {
            setMsgSnackbar("Something went wrong");
            setTimeout(() => window.location.reload(), 3000);
          }
        }
      } else {
        setOpenSnackbar(true);
        setMsgSnackbar("Enter all inputs");
        setTimeout(() => setOpenSnackbar(false), 3000);
      }
    } else {
      setLandingPageBool(false);
      setEnterEmailBool(true);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!inputEmail) alert("Insert Email");
    else {
      setActivateLoadingIn("send-verification-code");
      const resp = await axios.get("/email/verify", {
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
      const resp = await axios.get("/login", {
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
      const resp = await axios.get("/profile", {
        inputEmail,
      });
      const res = resp.data;
      setEnterEmailBool(false);
      if (!res.profile) {
        setAskedForSendVerificationCode(true);
      } else {
        setInsertVerifyCode(true);
        setEnterPinOrCodeBool("pin");
      }
    }
  };

  const handleSubmitSignupForm = async () => {
    if (signupFormInputs === {} || signupFormInputs.university === "other") {
      setOpenSnackbar(true);
      setMsgSnackbar("Enter all Inputs");
      setTimeout(() => setOpenSnackbar(false), 3000);
    } else {
      setLoadingBool(true);
      let formData = new FormData();
      formData.set("formInput", JSON.stringify(signupFormInputs));
      formData.set("avatar", avatar);
      formData.set("email", inputEmail);
      const resp = await axios.get("/create", formData);
      setLoadingBool(false);
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

  const handleInviteOpen = () => {
    setInviteDialog(true);
  };

  const handleInviteClose = (value) => {
    setInviteDialog(false);
  };
  const handleDownloadOpen = () => {
    takeScreenshot();
    setDownloadDialog(true);
  };

  const handleDownloadClose = (value) => {
    setDownloadDialog(false);
    setDownloadInput(value);
  };

  const handleNewUniversityForm = async () => {
    if (!newUnivesityName || !newUnivesityLogo) {
      setOpenSnackbar(true);
      setMsgSnackbar("Fill all required Inputs");
      setTimeout(() => setOpenSnackbar(false), 3000);
    } else {
      setLoadingBool(true);
      const formData = new FormData();
      formData.set("name", newUnivesityName);
      formData.set("logo", newUnivesityLogo);
      const resp = await axios.get("/institute/add", formData);
      setLoadingBool(false);
      setOpenSnackbar(true);
      setTimeout(() => setOpenSnackbar(false), 3000);
      setMsgSnackbar(resp.data.respMessage);
      if (resp.data.added && resp.data.institute) {
        setUniversityList((instituteList) => [
          ...instituteList,
          resp.data.institute,
        ]);
        if (newUniversityOnSuccess === "signup") {
          setSignUpformBool(true);
        } else {
          setLandingPageBool(true);
        }
        setNewUniversityBool(false);
      }
    }
  };

  const handleSearchForStudents = async (uni) => {
    setScribbleList([]);
    const resp = await axios.get("/friends/list", {
      university: uni,
    });
    if (resp.data && resp.data.friendsList) {
      setFriendList(
        resp.data.friendsList.length > 0 ? resp.data.friendsList : []
      );
      setDFriendList(
        resp.data.friendsList.length > 0 ? resp.data.friendsList : []
      );
    }
  };

  const handleOnDragStart = () => {
    // set
  };

  function InviteFriend(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <ShareCard userdata={userdata ? userdata : null} />
      </Dialog>
    );
  }

  InviteFriend.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  function PlaceOrder(props) {
    const { onClose, open } = props;
    const handlePlaceOrderClose = () => {
      onClose();
    };
    console.log(userdata);

    return (
      <Dialog
        onClose={handlePlaceOrderClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <OrderCard userdata={userdata ? userdata : null} />
      </Dialog>
    );
  }

  PlaceOrder.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  function DownloadForm(props) {
    const { onClose, selectedValue, open, image } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <div style={{ padding: 12, display: "flex", flexDirection: "column" }}>
          {image ? (
            <img src={image} alt="Scribble Preview" />
          ) : (
            <CircularProgress style={{ margin: "9px auto" }} />
          )}
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0A0",
              marginInline: 10,
              color: "#fff",
            }}
          >
            <span className={"fa fa-download"}></span>
            Download
          </Button>
        </div>
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
      <SuperHeader />

      <div className={"main"}>
        <div className={"center scribble-imgbox"}>
          <div className="row" style={{ width: "100%" }}>
            <div className={"column"}></div>
            <div className={"column"}>
              <div>
                <Image
                  src={
                    "https://scribble2021.s3.ap-south-1.amazonaws.com/ScribbleDayLogo2021.png"
                  }
                  height="200px"
                  alt="logo"
                />
              </div>
            </div>
            <div className={"column"}>
              <div
                className="details-of-site"
                style={{ marginTop: "50px", float: "left", width: "100%" }}
              >
                <div className="part">
                  <ButtonGroup
                    disableElevation
                    aria-label="contained"
                    disabled={isFixed ? true : false}
                  >
                    <Button
                      color="primary"
                      onClick={() => {
                        setTshirtSide("front");
                      }}
                    >
                      Front
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setTshirtSide("back");
                      }}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="part d-sm-none">
                  <ButtonGroup disableElevation variant="contained">
                    <Button href="#formboxbysend" color="primary">
                      Send Scribble
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

              <div style={{ textAlign: "left" }} className="d-none d-sm-block">
                {userdata && userDetailsBool && (
                  <>
                    <Button
                      onClick={async () => {
                        setDownloadClicked(!downloadClicked);
                        if (!downloadClicked) {
                          setLoadingFor("downloadTshirt");
                          await takeScreenshot();
                          setTimeout(() => setLoadingFor(""), 1000);
                        } else {
                          setLoadingFor("downloadTshirt");
                          await takeScreenshot();
                          const clear = setInterval(async () => {
                            if (true) {
                              const imageBool = await download(image);
                              if (imageBool) {
                                setLoadingFor("");
                                clearInterval(clear);
                              }
                            }
                          }, 3000);
                        }
                      }}
                      style={{
                        backgroundColor: "#0A0",
                        marginInline: 10,
                        color: "#fff",
                      }}
                    >
                      {loadingFor === "downloadTshirt" ? (
                        <CircularProgress
                          size={20}
                          style={{ color: "white" }}
                        />
                      ) : (
                        <>
                          <span className={"fa fa-download"}> </span>
                          {downloadClicked ? "Click to Download" : "Download"}
                        </>
                      )}
                    </Button>
                    <DownloadForm
                      insertVerifyCode={insertVerifyCode}
                      selectedValue={downloadInput}
                      open={openDownloadDialog}
                      onClose={handleDownloadClose}
                      image={image}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleDownloadOpen()}
                      style={{
                        backgroundColor: "#05ABFF",
                        marginInline: 10,
                        color: "#fff",
                      }}
                    >
                      <span className={"fa fa-user"}></span>
                      Preview
                    </Button>
                  </>
                )}
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
                  <div className="navWrapper">
                    <div className={"actions"}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          window.location.replace("/");
                        }}
                        startIcon={<HomeIcon />}
                      ></Button>
                    </div>
                    <Link className={"actions"} to={"/resources"}>
                      <Button
                        variant="contained"
                        startIcon={<InfoIcon />}
                      ></Button>
                    </Link>
                    <Link className={"actions"} to={"/faq"}>
                      <Button
                        variant="contained"
                        startIcon={<HelpIcon />}
                      ></Button>
                    </Link>
                    <div className={"actions"} style={{ flex: "1 0 auto" }}>
                      <Button
                        variant="contained"
                        onClick={handleMyScribbleClick}
                        style={{ backgroundColor: "#183D5D", color: "#fff" }}
                        startIcon={
                          userdata ? <PermIdentityIcon /> : <SecurityIcon />
                        }
                      >
                        {userdata ? "My Scribble" : "Sign In"}
                      </Button>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      margin: "12px 0 16px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  {userDetailsBool && userdata && (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={async () => {
                          const resp = await axios.post("/logout");
                          if (resp.data.loggedout) {
                            setUserDetailsBool(false);
                            setLandingPageBool(true);
                            setUserData(null);
                          } else {
                            setOpenSnackbar(true);
                            setMsgSnackbar("You're not logged in!");
                            setTimeout(() => setOpenSnackbar(false), 3000);
                          }
                        }}
                        style={{
                          backgroundColor: "#1C3750",
                          color: "rgba(255,255,255,.4)",
                          marginInline: 20,
                        }}
                      >
                        <span>Logout</span>
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => setPlaceOrderDialog(true)}
                        style={{ backgroundColor: "#0A0", color: "#fff" }}
                        startIcon={
                          <span className={"fa fa-shopping-cart"}></span>
                        }
                      >
                        Place Order
                      </Button>
                    </>
                  )}
                </div>
                <div
                  className="formBox row align-items-center"
                  id="formboxbysend"
                >
                  <hr />
                  {landingPageBool && (
                    <>
                      <div className="col-12"></div>
                      <div className="formAvatarGroup col-12">
                        <div
                          id="un"
                          style={{
                            position: "relative",
                            width: "100%",
                            zIndex: 3,
                          }}
                          ref={searchUniversityRef}
                        >
                          <Typography
                            gutterBottom
                            style={{
                              fontSize: "0.8em",
                              color: "#71E2F0",
                              cursor: "pointer",
                              float: "right",
                            }}
                            onClick={() => {
                              setNewUniversityBool(true);
                              setLandingPageBool(false);
                              setNewUniversityOnSuccess("landingPage");
                            }}
                          >
                            Didn't find University?
                          </Typography>
                          <Form.Control
                            className={" form"}
                            type="text"
                            placeholder="Search University"
                            name="message"
                            maxLength={250}
                            value={university}
                            onFocus={() => {
                              setUlistFocus(true);
                              setFriendFocus(false);
                            }}
                            onBlur={() => {
                              if (!isSearchUniversityFocused) {
                                setUlistFocus(false);
                              }
                            }}
                            onChange={(e) => {
                              setIsFixed(false);
                              setDragBool(false);
                              searchFilterFunction(
                                e.target.value,
                                duniversityList,
                                setUniversityList
                              );
                            }}
                            required
                          />
                          <div className={classes.resultOfUlist}>
                            {isUlistFocus && (
                              <>
                                {universityList.length > 0 &&
                                  universityList.map((uObj) => (
                                    <div
                                      className={classes.resultListItem}
                                      onClick={() => {
                                        setUniversity(uObj.name);
                                        setUlistFocus(false);
                                        setUniversityLogo(uObj.logo);
                                        handleSearchForStudents(uObj.name);

                                        // reset friend data

                                        setFriendData(null);
                                        setEnterFriendName("");
                                        setFriendLogo();
                                        setFriendFocus(false);
                                      }}
                                    >
                                      {uObj.name}
                                    </div>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                        <Avatar
                          style={{ marginLeft: 12 }}
                          alt="U"
                          src={
                            universityLogo
                              ? universityLogo
                              : require("../../assets/universitydemologo.png")
                          }
                        />
                      </div>

                      <div className="col-12">
                        <InviteFriend
                          open={openInviteDialog}
                          onClose={handleInviteClose}
                        />
                      </div>
                      <div className="formAvatarGroup col-12">
                        <div
                          id="fd"
                          style={{
                            position: "relative",
                            width: "100%",
                            zIndex: 2,
                          }}
                          ref={searchFriendRef}
                        >
                          <Typography
                            gutterBottom
                            style={{
                              fontSize: "0.8em",
                              color: "#71E2F0",
                              cursor: "pointer",
                              float: "right",
                            }}
                            onClick={handleInviteOpen}
                          >
                            Didn't find your Friend?
                          </Typography>
                          <Form.Control
                            className={" form"}
                            type="text"
                            placeholder="Search Friend"
                            name="friendname"
                            maxLength={250}
                            col-12
                            col-sm-8
                            col-md-9
                            value={enterFriendName}
                            onFocus={() => {
                              setFriendFocus(true);
                              setUlistFocus(false);
                            }}
                            onBlur={() => {
                              if (!isSearchFriendFocused) {
                                setFriendFocus(false);
                              }
                            }}
                            onChange={(e) => {
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
                              friendList.length > 0 &&
                              friendList.map((uObj) => (
                                <div
                                  className={classes.resultListItem}
                                  onClick={async () => {
                                    setFriendData({
                                      friendUserId: uObj.userId,
                                      friendName: uObj.name,
                                      friendAvatar: uObj.avatar,
                                    });
                                    setEnterFriendName(uObj.name);
                                    setFriendLogo(uObj.avatar);
                                    setFriendFocus(false);
                                    // find user's scribble
                                    const scribbleResp = await axios.post(
                                      "/friends/scribbles",
                                      {
                                        userId: uObj.userId,
                                      }
                                    );
                                    if (scribbleResp.data) {
                                      setScribbleList(
                                        scribbleResp.data.scribbleList
                                      );
                                    }
                                  }}
                                >
                                  {uObj.name}
                                </div>
                              ))}
                          </div>
                        </div>
                        <Avatar
                          style={{ marginLeft: 12 }}
                          alt="F"
                          src={
                            friendLogo
                              ? friendLogo
                              : require("../../assets/userdemoimage.jpg")
                          }
                        />
                      </div>
                      <Form.Control
                        className={"col-12 form"}
                        type="text"
                        placeholder="Scribble Message"
                        name="message"
                        maxLength={250}
                        multiple={true}
                        as="textarea"
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />

                      <div className="fontWrapper">
                        <div
                          className={"info"}
                          onClick={() => handleFixClick()}
                        >
                          Font Size {" >"}
                        </div>
                        <div
                          style={{ fontSize: ".4em" }}
                          className={"actions"}
                          onClick={() => setMessageFont(".4em")}
                        >
                          x-small
                        </div>
                        <div
                          style={{ fontSize: ".5em" }}
                          className={"actions"}
                          onClick={() => setMessageFont(".5em")}
                        >
                          small
                        </div>
                        <div
                          style={{ fontSize: ".6em" }}
                          className={"actions"}
                          onClick={() => setMessageFont(".6em")}
                        >
                          medium
                        </div>
                        <div
                          style={{ fontSize: ".7em" }}
                          className={"actions"}
                          onClick={() => setMessageFont(".7em")}
                        >
                          large
                        </div>
                        <div
                          style={{ fontSize: ".9em" }}
                          className={"actions"}
                          onClick={() => setMessageFont(".8em")}
                        >
                          x-large
                        </div>
                      </div>

                      <div className="fontWrapper">
                        <div
                          className="info"
                          style={{ flex: "1 0 auto" }}
                          onClick={() => handleFixClick()}
                        >
                          Rotate {" >"}
                        </div>
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
                      <div className={"fontWrapper"}>
                        <div className="colorfontwrapper">
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
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
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
                            style={{ color: "#b5d7f3" }}
                          >
                            Select Font
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={fontFam}
                            onChange={handleFontChange}
                            label="Font"
                            style={{
                              backgroundColor: "#183D5D",
                              color: "#b5d7f3",
                            }}
                          >
                            <MenuItem value="">
                              <em>Select form</em>
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily:
                                  "Comic Sans MS, Comic Sans, cursive",
                              }}
                              value={"Comic Sans MS, Comic Sans, cursive"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily:
                                  "Brush Script MT, Brush Script Std, cursive",
                              }}
                              value={
                                "Brush Script MT, Brush Script Std, cursive"
                              }
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "Trattatello, fantasy",
                              }}
                              value={"Trattatello, fantasy"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "Jazz LET, fantasy",
                              }}
                              value={"Jazz LET, fantasy"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "Courier New, monospace",
                              }}
                              value={"Courier New, monospace"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "OCR A Std, monospace",
                              }}
                              value={"OCR A Std, monospace"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontFamily: "cursive",
                              }}
                              value={"cursive"}
                            >
                              Happy Scribble Day
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (isFixed) {
                              if (!userdata) {
                                setOpenSnackbar(true);
                                setMsgSnackbar("Login first to give Scribble");
                                setLandingPageBool(false);
                                setEnterEmailBool(true);
                                setTimeout(() => setOpenSnackbar(false), 6000);
                              } else if (
                                window.confirm(
                                  "You won't be able to edit again. Are you sure to continue?"
                                )
                              ) {
                                handleSendScribbleForm();
                              }
                            } else {
                              handleFixClick();
                            }
                          }}
                          style={{ backgroundColor: "#ED72C0", color: "#fff" }}
                        >
                          {loadingBool ? (
                            <CircularProgress
                              size={30}
                              style={{ color: "white" }}
                            />
                          ) : (
                            <>{isFixed ? "Click to Send Scribble" : "Save"}</>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                  {userDetailsBool &&
                    userdata &&
                    (loadingBool ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <div className="detailWrapper">
                          <label>{userdata.name}</label>
                          <label>{userdata.email}</label>
                          <label>{userdata.university}</label>
                        </div>
                        <div className="detailWrapper">
                          <label>Scribbles Messages Received</label>
                          <div
                            style={{
                              width: "100%",
                              height: 1,
                              margin: "12px 0 16px",
                              backgroundColor: "#999",
                            }}
                          />
                          <div
                            style={{
                              overflowY: "scroll",
                              maxHeight: "200px",
                            }}
                          >
                            {scribbleList.length > 0 ? (
                              scribbleList.map((scribble) => (
                                <div
                                  key={scribble._id}
                                  style={{
                                    fontSize: "14px",
                                  }}
                                >
                                  <CardHeader
                                    avatar={
                                      <Avatar
                                        aria-label="recipe"
                                        className={classes.avatar}
                                        src={scribble.sendByAvatar}
                                      ></Avatar>
                                    }
                                    title={scribble.sendByName}
                                    subheader={scribble.message}
                                  />
                                  <div
                                    style={{
                                      width: "100%",
                                      height: 1,
                                      margin: "12px 0 16px",
                                      backgroundColor: "#555",
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <p style={{ color: "rgba(255,255,255,0.5)" }}>
                                You didn't received any scribble yet!
                                <br /> Invite your friends to write scribbles
                                for you.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="part">
                          <a href={image}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  "Hey dear friend, Lets Celebrate Scribble Day 2021 virtullay together | Write a Scribble Message for me || www.thirsty-goldwasser-7273c9.netlify.app/"
                                );
                                setOpenSnackbar(true);
                                setMsgSnackbar(
                                  "Copied text to share on Instagram"
                                );
                                setTimeout(() => setOpenSnackbar(false), 1000);
                              }}
                              style={{
                                backgroundColor: "#8A374A",
                                color: "#fff",
                              }}
                            >
                              <span className={"fa fa-instagram"}></span>
                            </Button>
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/shareArticle?url=www.thirsty-goldwasser-7273c9.netlify.app/%20&title=Pandemic%20could%20ruin%20our%20studies%20But%20not%20our%20last%20day%20of%20college%20%7C%20%20%F0%9F%91%95%20Happy%20Scribble%20Day%202021%20%F0%9F%A5%B3%20%7C%20%20%20Write%20a%20Scribble%20for%20me%20"
                          >
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#2E73AD",
                                color: "#fff",
                              }}
                            >
                              <span className={"fa fa-linkedin"}></span>
                            </Button>
                          </a>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#4095ED",
                              color: "#fff",
                            }}
                            onClick={() => {
                              window.open(
                                "https://www.facebook.com/sharer/sharer.php?u=https%3A//thirsty-goldwasser-7273c9.netlify.app"
                              );
                              return false;
                            }}
                          >
                            <span className={"fa fa-facebook"}></span>
                          </Button>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              "https://twitter.com/intent/tweet?text=Pandemic%20could%20ruin%20our%20studies%20But%20not%20our%20last%20day%20of%20college%20%7C%0A%0A%F0%9F%91%95%20Happy%20Scribble%20Day%202021%20%F0%9F%A5%B3%20%7C%20%0A%0AWrite%20a%20Scribble%20for%20me%20%0A%0Ahttps%3A//thirsty-goldwasser-7273c9.netlify.app/u/" +
                              userdata.userId +
                              "%20%0A%0A%23scribbleday2021%20"
                            }
                          >
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#05ABFF",
                                color: "#fff",
                              }}
                            >
                              <span className={"fa fa-twitter"}></span>
                            </Button>
                          </a>
                          <a
                            href="https://web.whatsapp.com/send?text=Pandemic%20could%20ruin%20our%20studies%20But%20not%20our%20last%20day%20of%20college%20%7C%20%20%F0%9F%91%95%20Happy%20Scribble%20Day%202021%20%F0%9F%A5%B3%20%7C%20%20%20Write%20a%20Scribble%20for%20me%20%20%20https%3A//thirsty-goldwasser-7273c9.netlify.app/%20%20%20#scribbleday2021%20%20"
                            data-action="share/whatsapp/share"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#0DC143",
                                color: "#fff",
                              }}
                            >
                              <span className={"fa fa-whatsapp"}></span>
                            </Button>
                          </a>
                        </div>
                      </>
                    ))}
                  {insertVerifyCode && (
                    <>
                      <FormControl
                        className={"col-12 form"}
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
                              {loadingBool ? (
                                <CircularProgress
                                  size={30}
                                  style={{ color: "white" }}
                                />
                              ) : (
                                <SendIcon style={{ cursor: "pointer" }} />
                              )}
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
                      className={"col-12 form"}
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
                            {loadingBool ? (
                              <CircularProgress
                                size={30}
                                style={{ color: "white" }}
                              />
                            ) : (
                              <SendIcon style={{ cursor: "pointer" }} />
                            )}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {signupFormBool && !userdata && (
                    <>
                      <div className="col-12 row">
                        <FormControl
                          variant="filled"
                          className={classes.formControl}
                          style={{ width: "100%", margin: "12px 0" }}
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
                            {universityList.length > 0 &&
                              universityList.map((university) => (
                                <MenuItem value={university.name}>
                                  {university.name}
                                </MenuItem>
                              ))}
                            <MenuItem
                              value={"other"}
                              onClick={() => {
                                setNewUniversityBool(true);
                                setSignUpformBool(false);
                                setNewUniversityOnSuccess("signup");
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
                            style={{ flexDirection: "row" }}
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
                        <label for="avatar" style={{ width: "100%" }}>
                          <div
                            className="file-upload-control"
                            style={{
                              background: "#e52e71",
                              padding: "0.5rem 2rem",
                              borderRadius: 8,
                              display: "inline-flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <CloudUploadIcon />
                            <span style={{ marginLeft: 12 }}>
                              upload profile picture
                            </span>
                          </div>
                        </label>
                        <Button
                          variant="contained"
                          onClick={handleSubmitSignupForm}
                        >
                          {loadingBool ? (
                            <CircularProgress style={{ margin: "9px auto" }} />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                  {newUniversityBool && (
                    <>
                      <Form.Control
                        className={"col-12 form"}
                        type="text"
                        placeholder="Univesity Name"
                        name="newuniversity"
                        maxLength={250}
                        value={newUnivesityName}
                        onChange={(e) => setNewUniversityName(e.target.value)}
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
                      <label for="newuniversitylogo" style={{ width: "100%" }}>
                        <div
                          className="file-upload-control"
                          style={{
                            background: "#e52e71",
                            padding: "0.5rem 2rem",
                            borderRadius: 8,
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <CloudUploadIcon />
                          <span style={{ marginLeft: 12 }}>Upload Logo</span>
                        </div>
                      </label>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewUniversityForm}
                      >
                        {loadingBool ? (
                          <CircularProgress
                            size={30}
                            style={{ color: "white" }}
                          />
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{ textAlign: "center", marginBottom: "1rem" }}
              className="d-block d-sm-none"
            >
              {userdata && userDetailsBool && (
                <>
                  <Button
                    onClick={async () => {
                      setDownloadClicked(!downloadClicked);
                      if (!downloadClicked) {
                        setLoadingFor("downloadTshirt");
                        await takeScreenshot();
                        setTimeout(() => setLoadingFor(""), 1000);
                      } else {
                        setLoadingFor("downloadTshirt");
                        await takeScreenshot();
                        const clear = setInterval(async () => {
                          if (true) {
                            const imageBool = await download(image);
                            if (imageBool) {
                              setLoadingFor("");
                              clearInterval(clear);
                            }
                          }
                        }, 3000);
                      }
                    }}
                    style={{
                      backgroundColor: "#0A0",
                      marginInline: 10,
                      color: "#fff",
                    }}
                  >
                    {loadingFor === "downloadTshirt" ? (
                      <CircularProgress size={20} style={{ color: "white" }} />
                    ) : (
                      <>
                        <span className={"fa fa-download"}> </span>
                        {downloadClicked ? "Click to Download" : "Download"}
                      </>
                    )}
                  </Button>
                  <DownloadForm
                    insertVerifyCode={insertVerifyCode}
                    selectedValue={downloadInput}
                    open={openDownloadDialog}
                    onClose={handleDownloadClose}
                    image={image}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleDownloadOpen()}
                    style={{
                      backgroundColor: "#05ABFF",
                      marginInline: 10,
                      color: "#fff",
                    }}
                  >
                    <span className={"fa fa-user"}></span>
                    Preview
                  </Button>
                </>
              )}
            </div>
            {!userDetailsBool && (
              <Row className="justify-content-center" style={{ padding: 16 }}>
                <Col xs={12} sm={10} lg={8} className="d-flex flex-column">
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
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (userdata) {
                              {
                                setPlaceOrderDialog(true);
                              }
                            } else {
                              setMsgSnackbar("Login First");
                              setOpenSnackbar(true);
                              setTimeout(() => setOpenSnackbar(false), 1000);
                              setLandingPageBool(false);
                              setEnterEmailBool(true);
                            }
                          }}
                          style={{ backgroundColor: "#0A0", color: "#fff" }}
                          startIcon={
                            <span className={"fa fa-shopping-cart"}></span>
                          }
                        >
                          Place Order
                        </Button>
                      </div>
                      <div className="col-12">
                        <PlaceOrder
                          open={openPlaceOrderDialog}
                          onClose={() => {
                            setPlaceOrderDialog(false);
                          }}
                        />
                      </div>
                    </div>

                    <div className="part">
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleInviteOpen}
                          style={{ backgroundColor: "#05ABFF", color: "#fff" }}
                          startIcon={<span className={"fa fa-share"}></span>}
                        >
                          Invite Friend
                        </Button>
                      </div>
                    </div>
                  </div>

                  <footer
                    className={"center"}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <p>
                      Spread the happiness among your friends, juniors, seniors
                      and connections to celebrate this year's{" "}
                      <a href="/" target="_blank" rel="noopener noreferrer">
                        Scribble Day
                      </a>
                    </p>
                  </footer>
                </Col>
              </Row>
            )}
          </div>
          <div className={"column"}>
            {/* RIGHT COLUMN */}

            <div className={"scribble-image1"} ref={imageWrap}>
              {tshirtSide === "front" ? (
                <Image
                  alt=""
                  src={require("../../assets/malefront.png")}
                  className={"male-front loading"}
                  ref={imageRef}
                />
              ) : (
                <Image
                  alt=""
                  src={require("../../assets/maleback.png")}
                  className={"male-front loading"}
                  ref={imageRef}
                />
              )}
              <div className={"university-logo"}>
                {tshirtSide === "front" && (
                  <Avatar
                    style={{
                      width: getFontSize(60, imageRefWidth),
                      height: getFontSize(60, imageRefWidth),
                    }}
                    alt="U"
                    src={
                      universityLogo
                        ? universityLogo
                        : require("../../assets/universitydemologo.png")
                    }
                  />
                )}
              </div>
              {scribbleList
                .filter((item) => item.side === tshirtSide)
                .map((scribble) => (
                  <p
                    key={scribble._id}
                    style={{
                      textAlign: "center",
                      rotate: scribble.angle + "deg",
                      color: scribble.colorCode,
                      fontSize: getFontSize(scribble.fontSize, imageRefWidth),
                      fontFamily: scribble.fontStyle,
                      position: "absolute",
                      // transform: `scale(${(imageRefWidth/616)+0.204})`,
                      top: `${scribble.dimensions.top}%`,
                      left: `${scribble.dimensions.left}%`,
                      width: "25%",
                    }}
                  >
                    {scribble.message}
                    <span>
                      <br />~ {scribble.sendByName}
                    </span>
                  </p>
                ))}
              <Draggable
                bounds="parent"
                disabled={dragBool}
                onStart={handleOnDragStart}
              >
                <div
                  className={"scribble-message1"}
                  style={
                    !dragBool && !userDetailsBool
                      ? {
                          border: "1px solid rgb(233, 233, 233)",
                        }
                      : {
                          border: "none",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  {enterFriendName ? (
                    <>
                      <div
                        style={{
                          rotate: rotateValue + "deg",
                          color: messageColor,
                          fontSize: getFontSize(messageFont, imageRefWidth),
                          fontFamily: fontFam,
                          cursor: dragBool ? "default" : "move",
                        }}
                      >
                        <p ref={messageRef}>
                          {message ? message : "Scribble Message"}
                          <span>
                            <br />~ {userdata ? userdata.name : "Your name"}
                          </span>
                        </p>
                      </div>
                    </>
                  ) : userDetailsBool ? (
                    <></>
                  ) : (
                    <div
                      style={{
                        rotate: rotateValue + "deg",
                        color: messageColor,
                        fontSize: messageFont,
                        cursor: dragBool ? "default" : "move",
                      }}
                    >
                      <p>Select a Friend to write a Scribble message</p>
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
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        message={msgSnackbar}
      />
    </div>
  );
}
export default Home;
