import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  Link
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginBG from "../../../assets/Auth/AuthBackGrounds/d158185a6e98393b02ffa614503c307e55f33da8.jpg"; // تأكد من المسار
import { validateAuthForm } from "../../services/Validations";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { toast } from "react-toastify";
import type { ForgotPassword } from "../../../interfaces/Auth/AuthTypes";
import "./ForgetPassword.module.css";
import { Link as RouterLink } from "react-router-dom";
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  let navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ForgotPassword>({ mode: "onChange" });

  const onSubmit = async (data: ForgotPassword) => {
    try {
      setIsLoading(true);
      let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/reset-password");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message || "cannot find this email");
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
                Forget Password
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
                  to="/login"
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
                    sx={{ color: "primary.main", fontWeight: "600" }}
                  >
                    Login Here !
                  </Box>
                </Link>
              </Typography>
            </Box>
          
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      Email
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
                          placeholder="Please Type Here"
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
                </Box>
              </Box>

              <Button
                type="submit"
                fullWidth
                disabled={!isValid || isLoading}
                sx={{
                  py: 1.5,
                  marginTop: "10px",
                  fontWeight: 500,
                  backgroundColor: "secondary.main",
                  "&:hover": { backgroundColor: "#1d3ecf" },
                  color: "white",
                  
                }}
                style={{color: "white",marginTop: "20px"}}
                className="forget-pass-button"
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 , color: "white"}} />
                    <span style={{ color: "white" }}>Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
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
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Forget Password
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
}
