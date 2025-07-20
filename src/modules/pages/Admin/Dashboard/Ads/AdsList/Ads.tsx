import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ADS_URL, axiosInstance, ROOMS_URLS } from "../../../../../services/Urls.ts";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { Box, CircularProgress, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import ViewModel from "../ViewAddModel/ViewModel.tsx";
import Header from "../../../../../shared/Header/Header.tsx";
import Swal from "sweetalert2";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Ad } from "../../../../../../interfaces/Ads/Ads.ts";
import type { RoomOption } from "../../../../../../interfaces/Rooms/Rooms.ts";




export default function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [roomList, setRoomList] = useState<RoomOption[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      room: "",
      discount: "",
      status: "true",
    },
  });

  const fetchAds = async (page = 1, size = 5) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${ADS_URL.GET_ads}?page=${page}&size=${size}`);
      const { ads, totalCount }: { ads: Ad[]; totalCount: number } = res.data.data;
      setAds(ads);
      setTotalResults(totalCount);
    } catch {
      toast.error("Error fetching ad data");
    } finally {
      setLoading(false);
    }
  };

  const getAllRooms = async () => {
    try {
      const res = await axiosInstance.get(ROOMS_URLS.GET_ROOMS);
      setRoomList(res.data.data.rooms);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error fetching room data");
    }
  };

  useEffect(() => {
    getAllRooms();
    fetchAds(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleAddRoom = () => {
    setIsEditMode(false);
    setEditingAd(null);
    reset({
      room: "",
      discount: "",
      status: "true",
    });
    setOpen(true);
  };

  const handleEdit = (row: Ad) => {
    setIsEditMode(true);
    setEditingAd(row);
    reset({
      discount: String(row.room?.discount ?? ""),
      status: row.isActive ? "true" : "false",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: { room: string; discount: string; status: string }) => {
    setLoading(true);
    try {
      let postData;

      if (isEditMode && editingAd) {
        postData = {
          discount: Number(data.discount),
          isActive: data.status === "true",
        };
        const res = await axiosInstance.put(
          ADS_URL.UPDATE_Ads(editingAd._id),
          postData
        );
        toast.success(res.data.message || "Ad updated successfully");
      } else {
        postData = {
          room: data.room,
          discount: Number(data.discount),
          isActive: data.status === "true",
        };
        const res = await axiosInstance.post(ADS_URL.ADD_ads, postData);
        toast.success(res.data.message || "Ad added successfully");
      }

      await fetchAds(currentPage, itemsPerPage);
      handleClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving ad");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: Ad) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete the ad for room "${row.room?.roomNumber}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await axiosInstance.delete(ADS_URL.DELETE_ads(row._id));
        fetchAds(currentPage, itemsPerPage);
        Swal.fire("Deleted!", res.data.message || "The ad has been deleted successfully.", "success");
      } catch (error: any) {
        Swal.fire("Error!", error.response?.data?.message || "Failed to delete the ads.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (row: Ad) => {
    setSelectedAd(row);
    setViewModalOpen(true);
  };

  const columns = [
    {
      id: "Room Number",
      label: "Room Number",
      align: "center" as const,
      render: (row: Ad) => row.room?.roomNumber,
    },
    {
      id: "Price",
      label: "Price",
      align: "center" as const,
      render: (row: Ad) => `$${row.room?.price}`,
    },
     {
      id: "Discount",
      label: "Discount",
      align: "center" as const,
      render: (row: Ad) => row.room?.discount,
    },
     {
      id: "Active",
      label: "Active",
      align: "center" as const,
      render: (row: Ad) => row.isActive ? "Yes" : "No",
    },
    {
      id: "Capacity",
      label: "Capacity",
      align: "center" as const,
      render: (row: Ad) => row.room?.capacity,
    },
    {
      id: "Created By",
      label: "Created By",
      align: "center" as const,
      render: (row: Ad) => row.createdBy?.userName ?? "-", 
    }
  ];

  return (
    <Box p={2}>
      <Header
        title="ADS Table Details"
        description="You can check all details"
        buttonText="Add New Ads"
        onButtonClick={handleAddRoom}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 0 } }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {isEditMode ? "Edit Ads" : "Add Ads"}

          <Button onClick={handleClose} size="small" color="error">
            <span style={{ fontSize: 20 }}>✖️</span>
          </Button>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ p: 3 }}>
            {!isEditMode && (
              <Controller
                name="room"
                control={control}
                rules={{ required: "Room is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    select
                    label="Room"
                    margin="normal"
                    fullWidth
                    variant="filled"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: 2, backgroundColor: '#e0e0e0', px: 1 },
                    }}
                  >
                    {roomList.map((r: RoomOption) => (
                      <MenuItem key={r._id} value={r._id}>
                        {r.roomNumber}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}

            <Controller
              name="discount"
              control={control}
              rules={{
                required: "Discount is required",
                min: { value: 1, message: "Discount must be at least 1" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Discount"
                  type="number"
                  margin="normal"
                  fullWidth
                  variant="filled"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    disableUnderline: true,
                    sx: { borderRadius: 2, backgroundColor: '#e0e0e0', px: 1 },
                  }}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  select
                  label="Status"
                  margin="normal"
                  fullWidth
                  variant="filled"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    disableUnderline: true,
                    sx: { borderRadius: 2, backgroundColor: '#e0e0e0', px: 1 },
                  }}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Not Active</MenuItem>
                </TextField>
              )}
            />
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: '1px solid #eee',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              color="inherit"
              sx={{ borderRadius: 2, textTransform: 'none', mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: '#1d3ecf',
                '&:hover': { backgroundColor: '#162fa5' },
                minWidth: 100,
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: '#fff' }} />
              ) : (
                isEditMode ? "Update" : "Save"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <SharedTable
            columns={columns}
            rows={ads}
            totalResults={totalResults}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onPageSizeChange={(newSize) => setItemsPerPage(newSize)}
            onDelete={handleDelete}
            onView={handleView}
            onEdit={handleEdit}
          />

          <ViewModel
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            Ads={selectedAd}
          />
        </>
      )}
    </Box>
  );
}