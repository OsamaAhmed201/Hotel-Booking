import { useEffect, useState } from "react";
import Header from "../../../../../shared/Header/Header.tsx";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { axiosInstance, ROOMS_URLS } from "../../../../../services/Urls.ts";
import defultRoom from "../../../../../../assets/r01_2.jpg"
import {
  CircularProgress,
  Box,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../../../../../shared/DeleteConfirmation/DeleteConfirmation.tsx";
import { toast } from "react-toastify";

interface Facility {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  discount: number;
  capacity: number;
  description: string;
  facilities: Facility[];
  createdAt: string;
  createdBy: {
    _id: string;
    userName: string;
    email: string;
    role: string;
  };
}

interface FormattedRoom {
  _id: string;
  name: string;
  image: string; // تم التأكد من أنها string
  price: number | string;
  discount: number | string;
  capacity: number | string;
  category: string;
}

const columns = [
  { id: "name", label: "Room Number" },
  {
    id: "image",
    label: "Image",
    render: (row: FormattedRoom) => (
      <img
        src={row.image || "/images/placeholder.jpg"} // هنا يتم تحديد الصورة الافتراضية
        alt="Room"
        style={{
          width: 50,
          height: 50,
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
    ),
  },
  { id: "price", label: "Price" },
  { id: "discount", label: "Discount" },
  { id: "capacity", label: "Capacity" },
  { id: "category", label: "Category" },
];

export default function Rooms() {
  const [rows, setRows] = useState<FormattedRoom[]>([]);
  const [open, setOpen] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loadDetails, setLoadDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [roomIdToDelete, setRoomIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
console.log(selectedRoom)
  const openDeleteModal = (row: FormattedRoom) => {
    setRoomIdToDelete(row._id);
    setOpen(true);
  };

  const closeDeleteModal = () => {
    setOpen(false);
    setRoomIdToDelete(null);
  };

  const openRoomDetails = (row: FormattedRoom) => {
    setOpenDetailsDialog(true);
    getRoomById(row._id);
  };

  const closeRoomDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedRoom(null);
  };

  const getRoomById = async (id: string) => {
    try {
      setLoadDetails(true);
      const response = await axiosInstance.get(ROOMS_URLS.GET_ROOM_BY_ID(id));
      console.log("Fetched room details:", response.data.data.room);
      setSelectedRoom(response.data.data.room);
    } catch (error: any) {
      console.error("Error fetching room details:", error);
      toast.error(
        error.response?.data?.message || "Failed to load room details."
      );
      closeRoomDetails();
    } finally {
      setLoadDetails(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(ROOMS_URLS.GET_ROOMS);
      const roomList: Room[] = response.data?.data?.rooms;

      if (!Array.isArray(roomList)) {
        console.warn("Unexpected API format for rooms:", response.data);
        setRows([]);
        return;
      }

      const formatted: FormattedRoom[] = roomList.map((room) => ({
        _id: room._id,
        name: room.roomNumber || "N/A",
        image: room.images && room.images.length > 0 ? room.images[0] : defultRoom, 
        price: room.price || "N/A",
        discount: room.discount || 0,
        capacity: room.capacity || "N/A",
        category: room.facilities?.map((f) => f.name).join(", ") || "N/A",
      }));

      setRows(formatted);
    } catch (error) {
      console.error("Error fetching room data:", error);
      toast.error("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!roomIdToDelete) {
      toast.error("No room selected for deletion.");
      closeDeleteModal();
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.delete(ROOMS_URLS.DELETE_ROOM(roomIdToDelete));
      toast.success("Room deleted successfully.");
      closeDeleteModal();
      fetchRooms();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to delete the room."
      );
      console.error("Error deleting room:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <div>
        <Header
          title="Rooms Table Details"
          description="You can check all details"
          buttonText="Add New Room"
          onButtonClick={() => {
            navigate("/dashboard/rooms-data");
          }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <SharedTable
            columns={columns}
            rows={rows}
            onView={(row) => openRoomDetails(row)}
            onEdit={(row) =>
              navigate(`/dashboard/rooms-data`, { state: { roomToEdit: row } })
            }
            onDelete={(row) => openDeleteModal(row)}
          />
        )}
        <DeleteConfirmationDialog
          open={open}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          loading={loading}
          title="Delete Room?"
          message="Are you sure you want to delete this room? This action cannot be undone."
        />
      </div>

      <Dialog open={openDetailsDialog} onClose={closeRoomDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Room Details</DialogTitle>
        <DialogContent dividers>
          {loadDetails ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : selectedRoom ? (
            <>
              <Box textAlign="center" mb={2}>
                <img
                  src={selectedRoom.images?.[0] || defultRoom} 
                  alt="Room"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>

              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2">Room Number:</Typography>
                    <Typography>{selectedRoom.roomNumber || "N/A"}</Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2">Price:</Typography>
                    <Typography>{selectedRoom.price || "N/A"}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2">Discount:</Typography>
                    <Typography>{selectedRoom.discount || "0"}</Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="subtitle2">Capacity:</Typography>
                    <Typography>{selectedRoom.capacity || "N/A"}</Typography>
                  </Box>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2">Description:</Typography>
                  <Typography>{selectedRoom.description || "N/A"}</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2">Facilities:</Typography>
                  <Typography>
                    {selectedRoom.facilities?.map((f) => f.name).join(", ") || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2">Created At:</Typography>
                  <Typography>
                    {selectedRoom.createdAt ? new Date(selectedRoom.createdAt).toLocaleString() : "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2">Created By:</Typography>
                  <Typography>
                    {selectedRoom.createdBy?.userName || selectedRoom.createdBy?.email || "N/A"}
                  </Typography>
                </Box>
              </Stack>
            </>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <Typography>No room details available.</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRoomDetails} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}