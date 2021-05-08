import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    paddingInline: 50,
    paddingBlock: 16,
    backgroundColor: "#073e6d",
    color: "#fff",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShareCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.userdata.avatar}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FileCopyIcon style={{ color: "#fff" }} />
          </IconButton>
        }
        title={props.userdata.name}
      />
      <CardContent
        style={{ border: "1px solid  rgb(233, 233, 223, .2)", marginBlock: 10 }}
      >
        <Typography variant="body2" component="p">
          Hey dear friend, Lets Celebrate Scribble Day 2021 virtullay |
          www.thirsty-goldwasser-7273c9.netlify.app//
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="part">
          <Button
            variant="contained"
            style={{ backgroundColor: "#8A374A", color: "#fff" }}
          >
            <span className={"fa fa-instagram"}></span>
          </Button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/shareArticle?mini=true&url=https://thirsty-goldwasser-7273c9.netlify.app/&title=%20Scribble%20Day%202021%20%20Write%20a%20Scribble%20for%20me%20&summary=Pandemic%20could%20ruin%20your%20studies%20But%20not%20your%20last%20day%20of%20college%20|%20#scribbleday2021&source=thirsty-goldwasser-7273c9.netlify.app/"
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
                "www.thirsty-goldwasser-7273c9.netlify.app/",
                "targetWindow",
                "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
              );
              return false;
            }}
          >
            <span className={"fa fa-facebook"}></span>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href =
                "https://twitter.com/share?url=" +
                encodeURIComponent(
                  "www.thirsty-goldwasser-7273c9.netlify.app/"
                ) +
                "&text=" +
                document.title;
            }}
            style={{
              backgroundColor: "#05ABFF",
              color: "#fff",
            }}
          >
            <span className={"fa fa-twitter"}></span>
          </Button>
          <a
            href="https://web.whatsapp.com/send?text=www.google.com"
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="contained"
              // onClick={() => handleDownloadOpen("share")}
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
    </Card>
  );
}
