import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LoginBG from "../../../assets/Auth/AuthBackGrounds/LoginBG.png"; // Assuming you have a background image
import { EyeIcon, EyeOffIcon } from "../../../assets/Auth/AuthIcons/Icons";
import { validateAuthForm } from "../../services/Validations";
import "./Login.module.css";
import type { LoginFormData } from "../../../interfaces/Auth/AuthTypes";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    clearErrors();

    try {
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      const { success, message, data: responseData } = response.data;


      if (!success) {
        const errorMessage = message || "Login failed. Please try again.";

        if (errorMessage.toLowerCase().includes("email")) {
          setError("email", { type: "server", message: errorMessage });
        } else if (errorMessage.toLowerCase().includes("password")) {
          setError("password", { type: "server", message: errorMessage });
        } else {
          setError("root", {
            type: "server",
            message: errorMessage,
          });
        }

        return;
      }

      toast.success(message || "You have successfully logged in!");

      login(responseData.token, responseData.user);
      navigate("/dashboard",{state:responseData.user});
    } catch (error: any) {
      console.error("Login error:", error);

      const serverMessage = error?.response?.data?.message;

      const errorMessage =
        serverMessage || "Network error. Please check your connection.";

      if (errorMessage.toLowerCase().includes("email")) {
        setError("email", { type: "server", message: errorMessage });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setError("password", { type: "server", message: errorMessage });
      } else {
        setError("root", {
          type: "server",
          message: errorMessage,
        });
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",

          gap: 5,
          p: { xs: 2, sm: 3, md: 2 },
        }}
      >
        <Box
          sx={{ mb: { xs: 3, md: 3 }, textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, color: "primary.main" }}
          >
            <Box component="span" sx={{ color: "secondary.main" }}>
              Stay
            </Box>
            cation.
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Box
            sx={{
              width: "100%",
              marginLeft: { lg: "2rem", md: "0rem" },
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "center", sm: "center", md: "flex-start" },

              gap: 2,
            }}
          >
            <Box
              sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>
                Sign in
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "400",
                }}
              >
                If you don't have an account register{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  color="primary"
                  sx={{
                    fontWeight: 400,
                    textDecoration: "none",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  You can{" "}
                  <Box
                    component="span"
                    sx={{ color: "#EB5148", fontWeight: "600" }}
                  >
                    Register Here !
                  </Box>
                </Link>
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitForm)}
              noValidate
            >
              {errors.root && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.root.message}
                </Alert>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#152C5B",
                      }}
                    >
                      Email Address
                    </Typography>
                    <Controller
                      name="email"
                      control={control}
                      rules={validateAuthForm.email}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          type="email"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "grey.50",
                            },
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                          InputLabelProps={{
                            shrink: true,
                            sx: {
                              display: "none",
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "#152C5B",
                        }}
                      >
                        Password
                      </Typography>
                      <Controller
                        name="password"
                        control={control}
                        rules={validateAuthForm.password}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Password"
                            InputLabelProps={{
                              shrink: true,
                              sx: {
                                display: "none",
                              },
                            }}
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            required
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "grey.50",
                              },
                              "& fieldset": {
                                border: "none",
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <EyeOffIcon />
                                    ) : (
                                      <EyeIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Link
                        href="/forget-password"
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "none" }}
                      >
                        Forget Password?
                      </Link>
                    </Box>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  className="login-button"
                  sx={{
                    py: 1.5,
                    fontWeight: 500,
                    backgroundColor: "secondary.main",
                    "&:hover": {
                      backgroundColor: "#1d3ecf", 
                    },
                    color: "white",
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {!isMobile && (
        <Box
          sx={{
            width: { md: "50%" },
            height: "95.2vh",
            position: "relative",
            backgroundImage: `url(${LoginBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 3,
            overflow: "hidden",
            mt: 2,
          }}
        >
          <img loading="lazy" alt="Login Background" src={LoginBG} />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))",
              display: "flex",
              alignItems: "flex-end",
              p: { md: 4, lg: 6 },
            }}
          >
            <Box sx={{ color: "white" }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, fontSize: { md: "2.5rem", lg: "3rem" } }}
              >
                Sign in to Roamhome
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Homes as unique as you
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
