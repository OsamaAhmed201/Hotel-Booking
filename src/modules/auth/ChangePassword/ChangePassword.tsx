import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "../../../assets/Auth/AuthIcons/Icons";
import ChangePassBG from "../../../assets/Auth/AuthBackGrounds/ChangePassBG.png";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import "./ChangePassword.module.css";
import type { ChangePasswordData } from "../../../interfaces/Auth/AuthTypes";


const passwordFields: {
  name: keyof ChangePasswordData;
  label: string;
}[] = [
  { name: "oldPassword", label: "Old Password" },
  { name: "newPassword", label: "New Password" },
  { name: "confirmPassword", label: "Confirm Password" },
];

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ChangePasswordData>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    setIsLoading(true);
    clearErrors();

    try {
      const response = await axiosInstance.post(USERS_URLS.CHANGE_PASS,data);

      const { success, message } = response.data;

      if (success) {
        toast.success(message || "Password changed successfully!");
      } else {
        toast.error(message || "Something went wrong.");
      }
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err?.response?.data?.message ||
        "Network error. Please try again later.";

      if (errorMessage.toLowerCase().includes("old")) {
        setError("oldPassword", { type: "server", message: errorMessage });
      } else if (errorMessage.toLowerCase().includes("new")) {
        setError("newPassword", { type: "server", message: errorMessage });
      } else if (errorMessage.toLowerCase().includes("confirm")) {
        setError("confirmPassword", {
          type: "server",
          message: errorMessage,
        });
      } else {
        setError("root" as any, {
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
            <Typography variant="h3" sx={{ fontWeight: 500, mb: 3 }}>
              Change Password
            </Typography>

            {errors.root && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.root.message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {passwordFields.map((field) => (
                    <Box
                      key={field.name}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "#152C5B",
                        }}
                      >
                        {field.label}
                      </Typography>

                      <Controller
                        name={field.name}
                        control={control}
                        rules={{
                          required: `${field.label} is required`,
                        }}
                        render={({ field: controllerField }) => (
                          <TextField
                            {...controllerField}
                            type={
                              showPassword[field.name] ? "text" : "password"
                            }
                            fullWidth
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message}
                            required
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                              sx: { display: "none" },
                            }}
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
                                      setShowPassword((prev) => ({
                                        ...prev,
                                        [field.name]: !prev[field.name],
                                      }))
                                    }
                                    edge="end"
                                  >
                                    {showPassword[field.name] ? (
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
                  ))}
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  className="changePass-button"
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
                      Saving...
                    </>
                  ) : (
                    "Change Password"
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
            backgroundImage: `url(${ChangePassBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 3,
            overflow: "hidden",
            mt: 2,
          }}
        >
          <img loading="lazy" alt="Change Password Background" src={ChangePassBG} />
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
                Change Password
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Update your credentials securely
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChangePassword;
