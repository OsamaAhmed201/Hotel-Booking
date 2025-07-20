import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { axiosInstance, USERS_BOOKINGS } from "../../../../services/Urls";
import payment from "../../../../../assets/payment.jpg";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking?.booking || location.state?.booking;
  const totalPrice = location.state?.totalPrice;

  const [showAddress, setShowAddress] = useState(true);

  useEffect(() => {
    if (!booking || !booking._id || !totalPrice) {
      toast.error("Missing booking details");
      navigate("/not-found");
    }
  }, [booking, totalPrice]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;
setIsLoading(true)
    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error || !token) {
        toast.error(error?.message || "Stripe token error");
        return;
      }

      await axiosInstance.post(USERS_BOOKINGS.PAY_BOOKING(booking._id), {
        token: token.id,
      });

      toast.success("Payment Successful 🎉");
      navigate("/payment-success");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Payment failed. Please try again.";
      toast.error(message);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      minHeight="100vh"
    >
      {/* Image */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Box
          component="img"
          src={payment}
          alt="payment"
          sx={{
            width: { xs: "100%", md: "90%" },
            objectFit: "contain",
            maxHeight: { xs: "250px", sm: "100%" },
          }}
        />
      </Box>

      {/* Form */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ xs: 2, sm: 4 }}
        py={{ xs: 2, sm: 4 }}
        
      >
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign="center"
          >
            Payment for Booking
          </Typography>

          <Typography variant="body1" mb={3} textAlign="center">
            Total to pay:{" "}
            <strong>{totalPrice ? `$${totalPrice}` : "Loading..."}</strong>
          </Typography>

          {showAddress ? (
            <>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  background: "#f5f5f5",
                }}
              >
                <AddressElement
                  options={{ mode: "shipping" }}
                  onChange={(event) => {
                    if (event.complete) {
                      console.log("Address complete", event.value);
                    }
                  }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setShowAddress(false)}
                sx={{ py: 1.5, fontWeight: "bold", fontSize: "1rem" ,borderRadius:2}}
              >
                Continue to Payment
              </Button>
            </>
          ) : (
            <>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                }}
              >
                <CardElement />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handlePayment}
                disabled={!stripe}
                sx={{ py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
              >
              {isLoading ? "Processing..." : "Pay Now"} 
              </Button>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
