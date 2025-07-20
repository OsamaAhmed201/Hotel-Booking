import { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Fade,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../contexts/AuthContext";

export default function UsersUpdate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

const { currentUser, userLoading, getCurrentUser } = useAuth();

useEffect(() => {
  getCurrentUser();
}, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#111827" : "#f3f6f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
      role="main"
      aria-label="User profile content"
    >
      {userLoading ? (
        <CircularProgress size={40} aria-label="Loading user profile" />
      ) : currentUser ? (
        <Fade in timeout={500}>
          <Card
            elevation={4}
            sx={{
              width: "100%",
              maxWidth: 480,
              borderRadius: 4,
              p: isMobile ? 2 : 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                  src={currentUser.profileImage ?? ""}
                  alt={`${currentUser.userName} profile image`}
                  title={currentUser.userName}
                  sx={{
                    width: 120,
                    height: 120,
                    boxShadow: 3,
                    border: "3px solid white",
                  }}
                  imgProps={{ loading: "lazy" }}
                />
                <Typography variant="h5" fontWeight="bold" aria-label="Username">
                  {currentUser.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary" aria-label="User email">
                  {currentUser.email}
                </Typography>

                <Divider sx={{ width: "100%", my: 2 }} />

                <Box
                  component="section"
                  aria-label="User information"
                  textAlign="left"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap={1}
                >
                  <Typography variant="body1">
                    <strong>Country:</strong> {currentUser.country}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created At:</strong>{" "}
                    {new Date(currentUser.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Updated At:</strong>{" "}
                    {new Date(currentUser.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/dashboard")}
                  sx={{ mt: 3, alignSelf: "stretch" }}
                  aria-label="Return to dashboard"
                >
                  Back to Dashboard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      ) : (
        <Typography color="error" role="alert">
          User not found.
        </Typography>
      )}
    </Box>
  );
}