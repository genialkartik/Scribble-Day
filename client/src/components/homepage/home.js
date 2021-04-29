import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import announcement from "../../assets/announcement.png";
import "./home.css";
import { useScreenshot } from 'use-screenshot-hook';

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function DownloadForm(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, image } = props;

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
      {image && <img src={image} />}
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

DownloadForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

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
  const { image, takeScreenshot } = useScreenshot({ref:imageRef});
  const classes = useStyles();
  const [message, setMessage] = useState("Scribble Message");
  const [sendee, setSendee] = useState("Your Name");
  const [messageColor, setMessageColor] = useState("#000000");
  const [dragBool, setDragBool] = useState(false);
  const [messageFont, setMessageFont] = useState(".8em");

  const [openDownloadDialog, setDownloadDialog] = useState(false);
  const [downloadInput, setDownloadInput] = useState(emails[1]);
  const [rotateValue, setRotateValue] = useState(0);

  const handleRotateChange = (event, newValue) => {
    setRotateValue(newValue);
  };
  const handleDownloadOpen = () => {
    takeScreenshot()
    setDownloadDialog(true);
  };

  const handleDownloadClose = (value) => {
    setDownloadDialog(false);
    setDownloadInput(value);
  };

  return (
    <div className={"appbody"}>
      <Container fluid className={"nav center"}>
        <Row className={"container text-center"}>
          <Col>
            <img src={announcement} height="40px" alt="announcement" />{" "}
            &nbsp;Don't forget to
            <a
              href="https://hacktoberfest.digitalocean.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              register
            </a>{" "}
            to be eligible for the tee or tree!
          </Col>
        </Row>
      </Container>

      <div className={"main"}>
        <div className={"center hacktoberfest-imgbox"}>
          <div className="row" style={{ width: "100%" }}>
            <div className={"column"}>
              <Image
                src={require("../../assets/ScribbleDay.png")}
                height="190px"
              />
            </div>
            <div className={"column"}>
              <div className="details-of-site" style={{ marginTop: "50px" }}>
                <div className="part">
                  <ButtonGroup disableElevation aria-label="contained">
                    <Button color="primary">Front</Button>
                    <Button color="secondary">Back</Button>
                  </ButtonGroup>
                </div>
                <div className="part">
                  <ButtonGroup disableElevation variant="contained">
                    <Button color="primary">Male</Button>
                    <Button color="secondary">Female</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* LEFT COLUMN */}
          <div className={"column"}>
            <h1
              className={"center text-center"}
              style={{
                color: "#FF8AE2",
                fontFamily: "sans",
                textAlign: "left",
              }}
            >
              A Day worth Remembering
            </h1>

            <Form
              // onSubmit={handleSubmit}
              autoComplete="off"
              inline
              className={"row justify-content-center form1"}
            >
              <div className={"col-12 col-sm-10 col-lg-8 d-flex"}>
                <div className="formBox row align-items-center justify-content-around">
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

            <div className="details-of-site" style={{ marginTop: "50px" }}>
              <div className="part">
                <div>
                  <Button
                    variant="contained"
                    onClick={handleDownloadOpen}
                    style={{ backgroundColor: "#0A0", color: "#fff" }}
                  >
                    <span className={"fa fa-download"}></span>
                    Download
                  </Button>
                  <DownloadForm
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
                    onClick={handleDownloadOpen}
                    style={{ backgroundColor: "#05ABFF", color: "#fff" }}
                  >
                    <span className={"fa fa-share"}></span>
                    Share
                  </Button>
                  <DownloadForm
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
                connections to <br /> celebrate this year's{" "}
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
              <h2 style={{position: 'absolute',
top: '50%',
left: '26%',
color: '#000',
zIndex: 1}}>I am madan</h2>
              <Image
                src={require("../../assets/tshirt1.png")}
                className={"male-front"}
              />
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
