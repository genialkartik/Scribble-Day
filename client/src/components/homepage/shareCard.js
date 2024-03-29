import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import {
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  FileCopy as FileCopyIcon,
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
} from "@material-ui/icons";
import useWindowDimensions from "../dimension";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    paddingInline: "5%",
    paddingBlock: "3%",
    backgroundColor: "#073e6d",
    color: "#fff",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShareCard(props) {
  const { width: windowWidth } = useWindowDimensions();
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const shareText = `🤩 Let's Celebrate Virtual Scribble Day together 🤔

  👕 Send me a Scribble Message 😎
  here 👉 https://foaxx.com${
    props.userdata ? `/u/${props.userdata.userId}` : "/"
  }
  It's Fun 🥳`;

  return (
    <Card className={classes.root}>
      {props.userdata ? (
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={props.userdata.avatar}
            ></Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setOpenSnackbar(true);
                setMsgSnackbar("Copied");
                setTimeout(() => setOpenSnackbar(false), 1000);
              }}
            >
              <FileCopyIcon style={{ color: "#fff" }} />
            </IconButton>
          }
          title={
            <Typography gutterBottom variant="h5">
              {props.userdata.name}
            </Typography>
          }
          subheader={props.userdata.userId}
        />
      ) : (
        <Typography gutterBottom variant="h5" style={{ textAlign: "center" }}>
          Virtual Scribble Day 2021
        </Typography>
      )}
      <CardContent
        style={{
          border: "1px solid  rgb(233, 233, 223, 0.2)",
          marginBlock: 10,
          borderRadius: 6,
        }}
      >
        <Typography variant="body2" component="p">
          {shareText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="part socials">
          {!props.userdata && (
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setOpenSnackbar(true);
                setMsgSnackbar("Copied");
                setTimeout(() => setOpenSnackbar(false), 1000);
                return false;
              }}
            >
              <FileCopyIcon />
            </Button>
          )}
          <a href="https://www.instagram.com/">
            <Button
              variant="contained"
              style={{ backgroundColor: "#8A374A", color: "#fff" }}
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setOpenSnackbar(true);
                setMsgSnackbar("Copied! share on Instagram now");
                setTimeout(() => {
                  setOpenSnackbar(false);
                }, 1000);
                return false;
              }}
            >
              <InstagramIcon />
            </Button>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A//foaxx.com${
              props.userdata ? `/u/${props.userdata.userId}` : "/"
            }&title=%F0%9F%A4%A9%20Let's%20Celebrate%20Virtual%20Scribble%20Day%20together%20%F0%9F%A4%94%20%20%F0%9F%91%95%20Send%20me%20a%20Scribble%20Message%20%F0%9F%98%8E%20here%20%F0%9F%91%89%20https%3A//foaxx.com${
              props.userdata ? `/u/${props.userdata.userId}` : "/"
            }%20It's%20Fun%20%F0%9F%A5%B3&summary=%F0%9F%A4%A9%20Let's%20Celebrate%20Virtual%20Scribble%20Day%20together%20%F0%9F%A4%94%0A%0A%F0%9F%91%95%20Send%20me%20a%20Scribble%20Message%20%F0%9F%98%8E%0Ahere%20%F0%9F%91%89%20https%3A//foaxx.com${
              props.userdata ? `/u/${props.userdata.userId}` : "/"
            }%0AIt's%20Fun%20%F0%9F%A5%B3&source=https%3A//foaxx.com${
              props.userdata ? `/u/${props.userdata.userId}` : "/"
            }`}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2E73AD",
                color: "#fff",
              }}
            >
              <LinkedInIcon />
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
                `https://www.facebook.com/sharer.php?u=www.foaxx.com${
                  props.userdata ? `/u/${props.userdata.userId}` : "/"
                }`
              );
              return false;
            }}
          >
            <FacebookIcon />
          </Button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?text=%F0%9F%A4%A9%20Let's%20Celebrate%20Virtual%20Scribble%20Day%20together%20%F0%9F%A4%94%0A%0A%F0%9F%91%95%20Send%20me%20a%20Scribble%20Message%20%F0%9F%98%8E%0Ahere%20%F0%9F%91%89%20https%3A//foaxx.com${
              props.userdata ? `/u/${props.userdata.userId}` : "/"
            }%0AIt's%20Fun%20%F0%9F%A5%B3`}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#05ABFF",
                color: "#fff",
              }}
            >
              <TwitterIcon />
            </Button>
          </a>
          <a
            href={
              windowWidth > 568
                ? `https://web.whatsapp.com/send?text=%F0%9F%A4%A9%20Let's%20Celebrate%20Virtual%20Scribble%20Day%20together%20%F0%9F%A4%94%0A%0A%F0%9F%91%95%20Send%20me%20a%20Scribble%20Message%20%F0%9F%98%8E%0Ahere%20%F0%9F%91%89%20https%3A//foaxx.com${
                    props.userdata ? `/u/${props.userdata.userId}` : "/"
                  }%0AIt's%20Fun%20%F0%9F%A5%B3&data-action="share/whatsapp/share`
                : `whatsapp://send?text=text=%F0%9F%A4%A9%20Let's%20Celebrate%20Virtual%20Scribble%20Day%20together%20%F0%9F%A4%94%0A%0A%F0%9F%91%95%20Send%20me%20a%20Scribble%20Message%20%F0%9F%98%8E%0Ahere%20%F0%9F%91%89%20https%3A//foaxx.com${
                    props.userdata ? `/u/${props.userdata.userId}` : "/"
                  }%0AIt's%20Fun%20%F0%9F%A5%B3&data-action="share/whatsapp/share`
            }
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
              <WhatsAppIcon />
            </Button>
          </a>

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
      </CardActions>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ zIndex: 10 }}
        open={openSnackbar}
        autoHideDuration={1000}
        message={msgSnackbar}
      />
    </Card>
  );
}
