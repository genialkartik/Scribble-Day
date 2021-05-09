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
import FileCopyIcon from "@material-ui/icons/FileCopy";

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
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const [shareText, setShareText] = useState(
    "Hey dear friend, Lets Celebrate Scribble Day 2021 virtullay together | Write a Scribble Message for me || www.thirsty-goldwasser-7273c9.netlify.app/"
  );

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
              }}
            >
              <span className={"fa fa-copy"}></span>
            </Button>
          )}
          <Button
            variant="contained"
            style={{ backgroundColor: "#8A374A", color: "#fff" }}
            onClick={() => {
              navigator.clipboard.writeText(shareText);
              setOpenSnackbar(true);
              setMsgSnackbar("Copied");
              setTimeout(() => {
                setOpenSnackbar(false);
                window.open("https://www.instagram.com/");
              }, 1000);
            }}
          >
            <span className={"fa fa-instagram"}></span>
          </Button>
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
            href="https://twitter.com/intent/tweet?text=Pandemic%20could%20ruin%20our%20studies%20But%20not%20our%20last%20day%20of%20college%20%7C%0A%0A%F0%9F%91%95%20Happy%20Scribble%20Day%202021%20%F0%9F%A5%B3%20%7C%20%0A%0AWrite%20a%20Scribble%20for%20me%20%0A%0Awww.thirsty-goldwasser-7273c9.netlify.app/%20%0A%0A%23scribbleday2021%20"
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
      </CardActions>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        message={msgSnackbar}
      />
    </Card>
  );
}
