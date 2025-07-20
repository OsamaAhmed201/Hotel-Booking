import { useEffect, useState } from "react";
import { axiosInstance, Facilities_URL } from "../../../../../services/Urls.ts";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ViewModel from "../ViewFacilitesModel/ViewModel.tsx";
import Header from "../../../../../shared/Header/Header.tsx";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Swal from "sweetalert2";

interface FacilityCreatedBy {
  _id: string;
  userName: string;
}

interface Facility {
  _id: string;
  name: string;
  createdBy: FacilityCreatedBy;
  createdAt: string;
  updatedAt: string;
}

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<Facility | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [facilityName, setFacilityName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddRoom = () => {
    setIsEditMode(false);
    setEditingFacility(null);
    setFacilityName("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setEditingFacility(null);
    setFacilityName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!facilityName.trim()) {
      toast.error("Please enter a facility name.");
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingFacility) {
        let response = await axiosInstance.put(
          Facilities_URL.UPDATE_FACILITIES(editingFacility._id),
          { name: facilityName }
        );
        toast.success(response.data.message || "Facility updated successfully");
      } else {
        let response = await axiosInstance.post(
          Facilities_URL.ADD_facilities,
          { name: facilityName }
        );
        toast.success(response.data.message || "Facility added successfully");
      }

      fetchFacilities(currentPage, itemsPerPage);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error saving facility");
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async (page = 1, size = 5) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${Facilities_URL.GET_facilities}?page=${page}&size=${size}`
      );
      const { facilities, totalCount }: { facilities: Facility[], totalCount: number } = res.data.data;
      setFacilities(facilities);
      setTotalResults(totalCount);
    } catch (err) {
      toast.error("Error fetching facilities data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: Facility) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete "${row.name}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        let res = await axiosInstance.delete(Facilities_URL.DELETE_facilities(row._id));
        fetchFacilities(currentPage, itemsPerPage);
        Swal.fire("Deleted!", res.data.message || "The facility has been deleted successfully.", "success");
      } catch (error: any) {
        Swal.fire("Error!", error.response?.data?.message || "Failed to delete the facility.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (row: Facility) => {
    setIsEditMode(true);
    setEditingFacility(row);
    setFacilityName(row.name);
    setOpen(true);
  };

  const handleView = (row: Facility) => {
    setSelectedFacilities(row);
    setViewModalOpen(true);
  };

  useEffect(() => {
    fetchFacilities(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const columns = [
    {
      id: "Name",
      label: "Name",
      align: "center" as "center",
      render: (row: Facility) => row.name,
    },
    {
      id: "Created By",
      label: "Created By",
      align: "center" as "center",
      render: (row: Facility) => row.createdBy?.userName ?? "-",
    },
    {
      id: "createdAt",
      label: "createdAt",
      align: "center" as "center",
      render: (row: Facility) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Box p={2}>
      <Header
        title="Facilities Table Details"
        description="You can check all details"
        buttonText="Add New Facilities"
        onButtonClick={handleAddRoom}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 0,
          },
        }}
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
          {isEditMode ? "Edit Facility" : "Add Facility"}
          <Button onClick={handleClose} size="small" color="error">
            <span style={{ fontSize: 20 }}>✖️</span>
          </Button>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <TextField
              autoFocus
              margin="normal"
              label="Name"
              name="name"
              fullWidth
              required
              variant="filled"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#e0e0e0',
                  px: 1,
                },
              }}
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
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                mr: 1,
              }}
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
                '&:hover': {
                  backgroundColor: '#162fa5',
                },
                minWidth: 100,
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: '#fff' }} />
              ) : (
                "Save"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <SharedTable
            columns={columns}
            rows={facilities}
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
            facilitie={selectedFacilities}
          />
        </>
      )}
    </Box>
  );
}