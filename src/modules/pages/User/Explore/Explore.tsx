import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Box,
  Pagination,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import defaultRoomImage from "../../../../assets/r01_2.jpg";
import {
  axiosInstance,
  ROOMS_USERS_URLS,
  USERS_FAVORITES,
} from "../../../services/Urls";
import { toast } from "react-toastify";
import { HeartIcon, ViewIcon } from "../../../../assets/ExploreIcons";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Room } from "../../../../interfaces/Explore/Explore";
import { useThemeContext } from "../../../../contexts/ThemeContext";

const PriceBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  backgroundColor: "#f14b99ff",
  color: "white",
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius,
  zIndex: 3,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  gap: theme.spacing(1),
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
}));

const RoomCard = React.memo(
  ({
    room,
    onFavourite,
    guests,
  }: {
    room: Room;
    onFavourite: () => void;
    guests: any;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { darkMode } = useThemeContext();
    const navigate = useNavigate();
    return (
      <Box
        sx={{
          flex: "1 1 calc(33.33% - 24px)",
          minWidth: 280,
          maxWidth: 360,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PriceBadge>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${room.price * (Number(guests) || 1)} per night
            </Typography>
          </PriceBadge>

          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="200"
              image={
                room.images && room.images.length > 0
                  ? room.images[0]
                  : defaultRoomImage
              }
              alt={`Room ${room.roomNumber}`}
              loading="lazy"
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                objectFit: "cover",
                aspectRatio: "16 / 9",
              }}
            />

            <IconContainer sx={{ opacity: isHovered ? 1 : 0 }}>
              <IconButton
                sx={{
                  backgroundColor: "rgba(187, 33, 33, 0.8)",
                  "&:hover": { backgroundColor: "white" },
                }}
                aria-label="favorite room"
                onClick={onFavourite}
              >
                <HeartIcon />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "rgba(41, 164, 208, 0.8)",
                  "&:hover": { backgroundColor: "white" },
                }}
                aria-label="view room details"
                onClick={() =>
                  navigate(`/details/${room._id}`, {
                    state: {
                      guests,
                    },
                  })
                }
              >
                <ViewIcon />
              </IconButton>
            </IconContainer>
          </Box>

          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: darkMode ? "#ffff" : "#1e293b" }}
            >
              Room {room.roomNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discount {room.discount}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
);

const ITEMS_PER_PAGE = 9;

function Explore() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const start = searchParams.get("startDate") ?? "";
  const end = searchParams.get("endDate") ?? "";
  const guests = Number(searchParams.get("guests"));

  const getAllRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        ROOMS_USERS_URLS.GET_USERS_ROOMS(start, end)
      );
      setRooms(response?.data?.data?.rooms || []);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching rooms:", err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Please check your authentication credentials.");
      } else {
        setError("Failed to load rooms. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const addToFavourites = async (roomId: string) => {
    try {
      const response = await axiosInstance.post(
        USERS_FAVORITES.ADD_TO_FAVOURITES,
        {
          roomId: roomId,
        }
      );
      toast.success(response.data.message);
      navigate("/Favorites");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to add to favourites"
      );
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const pageCount = useMemo(
    () => Math.ceil(rooms.length / ITEMS_PER_PAGE),
    [rooms.length]
  );

  const displayedRooms = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rooms.slice(startIndex, endIndex);
  }, [page, rooms]);

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { darkMode } = useThemeContext();
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Home / Explore
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            color: darkMode ? "#ffff" : "#1e293b",
          }}
        >
          Explore ALL Rooms
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: darkMode ? "#ffff" : "#1e293b",
          }}
        >
          All Rooms
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
            <Typography
              variant="h6"
              sx={{ ml: 2, color: darkMode ? "#ffff" : "#1e293b" }}
            >
              Loading Rooms...
            </Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              color: "error.main",
            }}
          >
            <Typography variant="h6">{error}</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {displayedRooms.map((roomItem) => (
                <RoomCard
                  key={roomItem._id}
                  room={roomItem}
                  onFavourite={() => addToFavourites(roomItem._id)}
                  guests={guests}
                />
              ))}
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: darkMode ? "#ffff" : "#1e293b",
                    borderColor: "#E0E0E0",
                    "&.Mui-selected": {
                      backgroundColor: "#6A62B6",
                      color: "white",
                      borderColor: "#6A62B6",
                    },
                    "&:hover": {
                      backgroundColor: "#EEE",
                    },
                  },
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default Explore;
