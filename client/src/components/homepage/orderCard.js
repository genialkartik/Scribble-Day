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

export default function OrderCard(props) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const [shareText, setShareText] = useState(
    "Hey dear friend, Lets Celebrate Scribble Day 2021 virtullay together | Write a Scribble Message for me || www.thirsty-goldwasser-7273c9.netlify.app/"
  );

  return (
    <div>
      <p>asdflksjd</p>
    </div>
  );
}
