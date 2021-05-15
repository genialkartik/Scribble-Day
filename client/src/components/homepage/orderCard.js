import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SecurityIcon from "@material-ui/icons/Security";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    paddingInline: "5%",
    paddingBlock: "3%",
    backgroundColor: "#073e6d",
    color: "#fff",
  },
  avatar: {
    backgroundColor: "red",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#0f4a77",
  },
}));

function getSteps() {
  return [
    "First, Click on Checkout",
    "Order Confirmation Details",
    "Shipping Details",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Clicking on 'Checkout', you will be directed to Razorpay Payment Gateway. 
      On Payment Successful, You will receive an Email and SMS with Order confirmation`;
    case 1:
      return `Within 12 hours of Order Confirmation, you will receive another email from 
      'info@ethicallearner.com' with subject 'Scribble Order Received Successfully' and 
      a Call (in-office hours). This email confirms your Order has been Received Successfully'. 
      Any Query? Reach us 24/7 on info@ethicallearner.com`;
    case 2:
      return `Now let us fabricate your T-shirt with your memories you gathered in 
      your graduation with friends and friends of friend`;
    default:
      return `Within a week, you will receive your Shipping Details on your registered
      Email with Order ID, Tracking Id and Shipping Details`;
  }
}

export default function OrderCard(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return props.userdata ? (
    <>
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
            <a
              href={"https://rzp.io/l/Up18AjAWH"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#0a0", color: "#fff" }}
                startIcon={<span className={"fa fa-credit-card"}></span>}
              >
                Checkout
              </Button>
            </a>
          }
          title={
            <Typography gutterBottom variant="h5">
              {props.userdata.name}
            </Typography>
          }
        />
        <CardContent
          style={{
            border: "1px solid  rgb(233, 233, 223, 0.2)",
            marginBlock: 10,
            borderRadius: 6,
            backgroundColor: "#7ef1",
          }}
        >
          <Typography variant="body2" component="p" style={{ color: "#7EFa" }}>
            Hey {props.userdata.name}, We think you deserve to know
            <div style={{ color: "#7EFf" }}>
              how you will receive your Scribble T-shirt after placing this
              Order.
            </div>
          </Typography>
        </CardContent>
      </Card>
      {/* Stepper ///////// */}
      <div>
        <Stepper
          style={{ backgroundColor: "#073e6d" }}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <Typography style={{ color: "#7EFa" }}>{label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography style={{ color: "#7EF" }}>
                  {getStepContent(index)}
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography style={{ color: "#7EF" }}>
              And that's it - you will receive your package delivered at your
              doorstep <br />
              <SecurityIcon /> safe and secure
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            <a
              href={"https://rzp.io/l/Up18AjAWH"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#0a0", color: "#fff" }}
                onClick={() => {}}
                startIcon={<span className={"fa fa-credit-card"}></span>}
              >
                Checkout Now
              </Button>
            </a>
          </Paper>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}
