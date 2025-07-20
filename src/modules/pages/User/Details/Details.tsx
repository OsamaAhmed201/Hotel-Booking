import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CardMedia,
  CircularProgress,
  Rating,
  TextField,
  Button,
  Card,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/AuthContext";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { axiosInstance, ROOMS_USERS_URLS } from "../../../services/Urls";

// Room features icons
import bedroomImg from "../../../../assets/bedroom.png";
import livingroomImg from "../../../../assets/livingroom.png";
import bathroomImg from "../../../../assets/bathroom.png";
import diningroomImg from "../../../../assets/diningroom.png";
import wifiImg from "../../../../assets/wifi.png";
import icacImg from "../../../../assets/icac.png";
import refrigeratorImg from "../../../../assets/refrigerator.png";
import tvImg from "../../../../assets/tv.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { RoomDetails } from "../../../../interfaces/Rooms/Rooms";
import CommentsSection from "./componets/comments";

export default function Details() {
  const { id } = useParams();
  const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const guests = location.state?.guests;
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState("");
  const [comment, setComment] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  ]);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const getRoomDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        ROOMS_USERS_URLS.GET_ROOM_DETAILS(id!)
      );
      setRoom(res.data.data.room);
    } catch {
      toast.error("Failed to fetch room");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async () => {
    if (!rating) return toast.error("Please provide a rating.");
    try {
      await axiosInstance.post(ROOMS_USERS_URLS.ADD_REVIEW, {
        roomId: id,
        rating,
        review,
      });
      toast.success("Rating submitted!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Rating failed");
    }
  };

  const handleComment = async () => {
    try {
      await axiosInstance.post(ROOMS_USERS_URLS.ADD_COMMENT, {
        roomId: id,
        comment,
      });
      toast.success("Comment submitted!");
      setCommentRefreshTrigger(prev => prev + 1); // 🔁 trigger refresh
    } catch {
      toast.error("Comment submission failed");
    }
  };

  const handleBookingClick = async () => {
    if (!user) return setOpenLoginModal(true);
    if (!dateRange[0] || !dateRange[1]) return toast.error("Pick a date.");

    const totalDays = Math.round(
      (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = totalDays * ((room?.price || 1) * (guests || 1));

    const bookingData = {
      startDate: format(dateRange[0], "yyyy-MM-dd"),
      endDate: format(dateRange[1], "yyyy-MM-dd"),
      room: id,
      totalPrice,
    };

    try {
      const response = await axiosInstance.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/booking",
        bookingData
      );

      navigate("/payment", {
        state: {
          booking: response.data.data,
          totalPrice,
        },
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, [id]);

  const totalDays = dateRange[0] && dateRange[1]
    ? Math.round(
      (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24)
    )
    : 0;

  const totalPrice = totalDays * (room?.price || 0);

  if (loading || !room) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        mb={3}
        color="#152C5B"
      >
        Room {room.roomNumber}
      </Typography>

      <CardMedia
        component="img"
        image={room.images?.[0] || "/placeholder-room.jpg"}
        alt={`Room ${room.roomNumber}`}
        sx={{
          borderRadius: 3,
          width: "60%",
          margin: "0 auto",
          objectFit: "cover",
          mb: 6,
        }}
      />

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={2}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              whiteSpace: "pre-line",
              mb: 4,
              color: "#B0B0B0",
            }}
          >
            {`Minimal techno is a minimalist subgenre of techno music. It is characterized
by a stripped-down aesthetic that exploits the use of repetition and
understated development. Minimal techno is thought to have been
originally developed in the early 1990s by Detroit-based producers Robert
Hood and Daniel Bell.

Such trends saw the demise of the soul-infused techno that typified the
original Detroit sound. Robert Hood has noted that he and Daniel Bell both
realized something was missing from techno in the post-rave era.

Design is a plan or specification for the construction of an object or system
or for the implementation of an activity or process, or the result of that plan
or specification in the form of a prototype, product or process. The national
agency for design: enabling Singapore to use design for economic growth
and to make lives better.`}
          </Typography>

          <Grid container spacing={2} mb={4}>
            {[
              { icon: bedroomImg, text: "5 bedroom" },
              { icon: livingroomImg, text: "1 living room" },
              { icon: bathroomImg, text: "3 bathroom" },
              { icon: diningroomImg, text: "1 dining room" },
              { icon: wifiImg, text: "10 mbp/s" },
              { icon: icacImg, text: "7 unit ready" },
              { icon: refrigeratorImg, text: "2 refrigerator" },
              { icon: tvImg, text: "4 television" },
            ].map((feature, _) => {
              const match = feature.text.match(/^(\d+)\s(.+)$/);
              const number = match?.[1] || "";
              const label = match?.[2] || feature.text;

              return (
                <Grid
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  mb={4}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    textAlign="left"
                    paddingRight={5}
                  >
                    <Box
                      component="img"
                      src={feature.icon}
                      alt={feature.text}
                      sx={{
                        width: 40,
                        height: 40,
                        mb: 1,
                        objectFit: "contain",
                      }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      <Box component="span" color="#152C5B">
                        {number}
                      </Box>{" "}
                      <Box component="span" color="#B0B0B0">
                        {label}
                      </Box>
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box flex={1.5}>
          <Card
            sx={{
              p: 7,
              borderRadius: 3,
              boxShadow: 1,
              position: "sticky",
              top: 20,
              backgroundColor: "#fff",
              minHeight: "500px",
            }}
          >
            <Typography color="#152C5B" fontWeight="bold" sx={{ mb: 3, py: 1 }}>
              Start Booking
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography>
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "#1ABC9C",
                    fontWeight: "bold",
                    marginRight: 10,
                  }}
                >
                  ${(guests || 1) * room.price}

                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    letterSpacing: ".2rem",
                    color: "#B0B0B0",
                  }}
                >
                  per night
                </span>
              </Typography>
              <Typography color="#FF1612" fontWeight="bold">
                Discount {room.discount}% Off
              </Typography>
            </Box>

            {/* Updated Date Picker Section */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  mt={10}
                  mb={2}
                  variant="subtitle1"
                  color="#152C5B"
                  fontWeight="bold"
                >
                  Pick a Date
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
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
                    <CalendarMonthIcon sx={{ color: "#fff", fontSize: 28 }} />
                  </Box>

                  {/* Date Range Display */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      flex: 1,
                    }}
                  >
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
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "#1e293b",
                          fontSize: "1rem",
                        }}
                      >
                        {dateRange[0]
                          ? format(dateRange[0], "dd MMM")
                          : "Select date"}
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
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "#1e293b",
                          fontSize: "1rem",
                        }}
                      >
                        {dateRange[1]
                          ? format(dateRange[1], "dd MMM")
                          : "Select date"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <DatePicker
                  open={startDateOpen}
                  onOpen={() => setStartDateOpen(true)}
                  onClose={() => setStartDateOpen(false)}
                  value={dateRange[0]}
                  onChange={(newValue: any) => {
                    setDateRange([newValue, dateRange[1]]);
                    setStartDateOpen(false);
                  }}
                  minDate={new Date()}
                  sx={{ display: "none" }}
                />

                <DatePicker
                  open={endDateOpen}
                  onOpen={() => setEndDateOpen(true)}
                  onClose={() => setEndDateOpen(false)}
                  value={dateRange[1]}
                  onChange={(newValue: any) => {
                    setDateRange([dateRange[0], newValue]);
                    setEndDateOpen(false);
                  }}
                  minDate={dateRange[0] || new Date()}
                  sx={{ display: "none" }}
                />
              </Box>
            </LocalizationProvider>

            <Typography variant="body1" mt={3} mb={3} fontWeight="medium">
              {totalDays > 0 ? (
                <>
                  <Box component="span" color="#B0B0B0">
                    You will pay{" "}
                  </Box>
                  <Box component="span" color="#152C5B" fontWeight="bold">
                    ${totalPrice} USD{" "}
                  </Box>
                  <Box component="span" color="#B0B0B0">
                    per{" "}
                  </Box>
                  <Box component="span" color="#152C5B" fontWeight="bold">
                    {totalDays} {totalDays === 1 ? "night" : "nights"}
                  </Box>
                </>
              ) : (
                <Box component="span" color="#B0B0B0">
                  Please pick a valid date range
                </Box>
              )}
            </Typography>

            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleBookingClick}
                sx={{
                  py: 1,
                  px: 5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "#3252DF",
                  "&:hover": {
                    backgroundColor: "#253bb3",
                  },
                }}
              >
                Continue Book
              </Button>
            </Box>
          </Card>

          <Dialog
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}
          >
            <DialogTitle>Login Required</DialogTitle>
            <DialogContent>
              <Typography>
                Please log in to continue booking this room.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenLoginModal(false)}>Close</Button>
              <Button variant="contained" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />



      {user && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="stretch"
        >
          <Box flex={1}>
            <Typography
              color="#152C5B"
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Rate
            </Typography>

            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
              size="large"
            />
            <Typography color="#152C5B" fontWeight="bold" gutterBottom mt={2}>
              Message
            </Typography>
            <TextField
              fullWidth
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button
              onClick={handleRate}
              variant="contained"
              sx={{
                py: 1,
                px: 8,
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: "#3252DF",
                "&:hover": {
                  backgroundColor: "#253bb3",
                },
              }}
            >
              Rate
            </Button>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          <Box flex={1}>
            <Typography
              color="#152C5B"
              variant="h6"
              fontWeight="bold"
              gutterBottom
              mb={4}
            >
              Add Your Comment
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment"
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={handleComment}
                variant="contained"
                sx={{
                  py: 1,
                  px: 8,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "#3252DF",
                  "&:hover": {
                    backgroundColor: "#253bb3",
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>

      )}
      <CommentsSection Id={id ?? null} refreshTrigger={commentRefreshTrigger} />
    </Container>
  );
}