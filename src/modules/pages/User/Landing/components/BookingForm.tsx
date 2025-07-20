

import { Box, Button, CardContent, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import React from "react"

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { useThemeContext } from "../../../../../contexts/ThemeContext"
import { useTranslation } from "react-i18next";
export const BookingForm = () => {
  const [guests, setGuests] = React.useState(2)
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)) // 6 days later
  const [startDateOpen, setStartDateOpen] = React.useState(false)
  const [endDateOpen, setEndDateOpen] = React.useState(false)
 const { darkMode } = useThemeContext();
  const handleGuestChange = (increment: boolean) => {
    if (increment) {
      setGuests((prev) => prev + 1)
    } else {
      setGuests((prev) => Math.max(1, prev - 1))
    }
  }
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  const formattedStart = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEnd = endDate ? format(endDate, "yyyy-MM-dd") : "";

  const searchParams = new URLSearchParams({
    startDate: formattedStart,
    endDate: formattedEnd,
    guests: guests.toString(),
  });

  navigate(`/Explore?${searchParams.toString()}`);
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        maxWidth: 500,
        width: "100%",
        p: 3,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode? '#ffff' : "#1e293b",
            fontSize: "1.75rem",
          }}
        >
          {t("bookingForm.startBooking")}
        </Typography>

        {/* Pick a Date Section */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: darkMode? '#ffff' : "#1e293b",
                fontSize: "1.25rem",
              }}
            >
               {t("bookingForm.pickDate")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                bgcolor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Calendar Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "#1e293b",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    border: "2px solid white",
                    borderRadius: "4px",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -4,
                      left: 4,
                      right: 4,
                      height: 2,
                      bgcolor: "white",
                      borderRadius: "1px",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 4,
                      left: 2,
                      right: 2,
                      bottom: 2,
                      border: "1px solid white",
                      borderRadius: "2px",
                    },
                  }}
                />
              </Box>

              {/* Date Range Display with Clickable Dates */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                {/* Start Date */}
                <Box
                  onClick={() => setStartDateOpen(true)}
                  sx={{
                    cursor: "pointer",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(79, 70, 229, 0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      mb: 0.5,
                    }}
                  >
                 {t("bookingForm.checkIn")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "#1e293b",
                      fontSize: "1rem",
                    }}
                  >
                    {startDate ? format(startDate, "dd MMM") : "Select date"}
                  </Typography>
                </Box>

                {/* Separator */}
                <Box
                  sx={{
                    width: 20,
                    height: 2,
                    bgcolor: "#e2e8f0",
                    borderRadius: "1px",
                    mx: 1,
                  }}
                />

                {/* End Date */}
                <Box
                  onClick={() => setEndDateOpen(true)}
                  sx={{
                    cursor: "pointer",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(79, 70, 229, 0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      mb: 0.5,
                    }}
                  >
                  {t("bookingForm.checkOut")}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "#1e293b",
                      fontSize: "1rem",
                    }}
                  >
                    {endDate ? format(endDate, "dd MMM") : "Select date"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Hidden Date Pickers */}
            <DatePicker
              open={startDateOpen}
              onOpen={() => setStartDateOpen(true)}
              onClose={() => setStartDateOpen(false)}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue ? new Date(newValue as Date) : null)
                setStartDateOpen(false)
              }}
              minDate={new Date()}
              sx={{ display: "none" }}
              slotProps={{
                popper: {
                  placement: "bottom-start",
                },
              }}
            />

            <DatePicker
              open={endDateOpen}
              onOpen={() => setEndDateOpen(true)}
              onClose={() => setEndDateOpen(false)}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue ? new Date(newValue as Date) : null)
                setEndDateOpen(false)
              }}
              minDate={startDate || new Date()}
              sx={{ display: "none" }}
              slotProps={{
                popper: {
                  placement: "bottom-start",
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        {/* Capacity Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
          color: darkMode? '#ffff' : "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            {t("bookingForm.capacity")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
              bgcolor: "#f8fafc",
              p: 2,
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Minus Button */}
            <IconButton
              type="button"
              onClick={() => handleGuestChange(false)}
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#ef4444",
                color: "white",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#dc2626",
                },
                "&:disabled": {
                  bgcolor: "#fca5a5",
                  color: "white",
                },
              }}
              disabled={guests <= 1}
              aria-label="Decrease guest count"
            >
              <Box
                sx={{
                  width: 20,
                  height: 3,
                  bgcolor: "currentColor",
                  borderRadius: "2px",
                }}
              />
            </IconButton>

            {/* Guest Count Display */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
               color: darkMode? '#ffff' : "#1e293b",
                fontSize: "1.1rem",
                minWidth: "100px",
                textAlign: "center",
              }}
            >
            {t("bookingForm.guests", { count: guests })}
            </Typography>

            {/* Plus Button */}
            <IconButton
              type="button"
              onClick={() => handleGuestChange(true)}
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#10b981",
                color: "white",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#059669",
                },
              }}
              aria-label="Increase guest count"
            >
              <Box
                sx={{
                  position: "relative",
                  width: 20,
                  height: 20,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 20,
                    height: 3,
                    bgcolor: "currentColor",
                    borderRadius: "2px",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 3,
                    height: 20,
                    bgcolor: "currentColor",
                    borderRadius: "2px",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            alignSelf: "flex-start",
            px: 4,
            py: 2,
            fontSize: "1.1rem",
            fontWeight: 600,
            bgcolor: "#4f46e5",
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            "&:hover": {
              bgcolor: "#4338ca",
              boxShadow: "0 6px 16px rgba(79, 70, 229, 0.4)",
            },
          }}
        >
         {t("bookingForm.explore")}
        </Button>
      </CardContent>
    </Box>
  )
}
