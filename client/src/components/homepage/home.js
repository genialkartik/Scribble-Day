import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
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

const emails = ["username@gmail.com", "user02@gmail.com"];
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
  const [message, setMessage] = useState("Scribble Message");
  const [sendee, setSendee] = useState("Your Name");
  const [messageColor, setMessageColor] = useState("#000000");
  const [dragBool, setDragBool] = useState(false);
  const [messageFont, setMessageFont] = useState(".8em");

  const [gender, setGender] = useState("female");
  const [frontSide, setSide] = useState(true);

  const [openDownloadDialog, setDownloadDialog] = useState(false);
  const [openPreviewDialog, setPreviewDialog] = useState(false);
  const [downloadInput, setDownloadInput] = useState(emails[1]);
  const [rotateValue, setRotateValue] = useState(0);
  const [gmailCode, setGmailCode] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowShare, setAllowShare] = useState(false);
  const [clickedOnShareOrDownload, setSD] = useState("download");

  const [university, setUniversity] = React.useState("");

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
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
    const { onClose, selectedValue, open, image, gmailcode } = props;
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

        {allowDownload ? (
          <>
            {clickedOnShareOrDownload === "download" ? (
              <div className="part">
                <Button
                  variant="contained"
                  // onClick={handleDownloadOpen}
                  style={{ backgroundColor: "#0A0", color: "#fff" }}
                >
                  <span className={"fa fa-download"}></span>
                  Download
                </Button>
              </div>
            ) : (
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
            )}
          </>
        ) : (
          <>
            <InputLabel
              htmlFor="input-with-icon-adornment"
              style={{ padding: 10 }}
            >
              Sign up to save and download
            </InputLabel>
            {gmailCode ? (
              <>
                <FormControl className={classes.margin} style={{ padding: 20 }}>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Verification Code"
                    variant="filled"
                    startAdornment={
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        position="end"
                        onClick={() => setAllowDownload(true)}
                      >
                        <SendIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </>
            ) : (
              <FormControl className={classes.margin} style={{ padding: 20 }}>
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Email"
                  variant="filled"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment
                      position="end"
                      onClick={() => setGmailCode(true)}
                    >
                      <SendIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          </>
        )}
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
                  gmailcode={gmailCode}
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
                <div className="formBox row align-items-center justify-content-around">
                  {/* <FormControl
                    variant="filled"
                    className={"col-12 col-sm-8 col-md-9 form"}
                  >
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      style={{ color: "#fff" }}
                    >
                      Select your University
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={university}
                      onChange={handleUniversityChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>LPU</MenuItem>
                      <MenuItem value={20}>Amity</MenuItem>
                      <MenuItem value={30}>TMU</MenuItem>
                    </Select>
                  </FormControl> */}
                  <Form.Control
                    className={"col-12 col-sm-8 col-md-9 form"}
                    type="text"
                    placeholder="University Name"
                    name="message"
                    maxLength={250}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={require("../../assets/lpu.png")}
                  />
                  <Form.Control
                    className={"col-12 col-sm-8 col-md-9 form"}
                    type="text"
                    placeholder="Friend's Name"
                    name="friendname"
                    maxLength={250}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <Avatar
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
                  <Form.Control
                    className={"col-12 col-sm-8 col-md-9 form"}
                    type="text"
                    placeholder="Your Name"
                    name="writeename"
                    maxLength={50}
                    onChange={(e) => setSendee(e.target.value)}
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
              <Button
                variant="contained"
                onClick={() => handleDownloadOpen("download")}
                style={{ backgroundColor: "#0A0", color: "#fff" }}
              >
                <span className={"fa fa-download"}></span>
                Save
              </Button>
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
                    gmailcode={gmailCode}
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
                    gmailcode={gmailCode}
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
            </div>

            <div className={"university-logo"}>
              <Image src={require("../../assets/lpu.png")} height="60px" />
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
        </div>
      </div>
    </div>
  );
}
export default Home;
