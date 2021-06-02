import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { commerce } from "../../../lib/commerce";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shippping Address", "Payment Details"];

const Checkout = ({ cart, error, onCaptureCheckout, order }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  const Confirmation = () => (
    // order.customer ? (
    <React.Fragment>
      <div>
        <Typography variant="h5">Thank you for your purchase!!</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </React.Fragment>
  );
  // ) : (
  // <div className={classes.spinner}>
  //   <CircularProgress />
  // </div>
  // );

  // if (error) {
  //   <React.Fragment>
  //     <Typography variant="h5"> Error: {error}</Typography>
  //     <Button component={Link} to="/" variant="outlined" type="button">
  //       Back to Home
  //     </Button>
  //   </React.Fragment>;
  // }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
