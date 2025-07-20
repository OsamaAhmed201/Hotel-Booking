
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
      <Card
        sx={{
          textAlign: "center",
          p: 4,
          bgcolor: "#E8F5E9",
          boxShadow: 3,
          borderRadius: 4,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "#6058f0ff" }} />
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#6058f0ff" }}
          >
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="textPrimary" sx={{ mb: 3 }}>
            Thank you! Your booking and payment have been confirmed. We wish
            you a pleasant stay.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 8, px: 4, py: 1 }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
  