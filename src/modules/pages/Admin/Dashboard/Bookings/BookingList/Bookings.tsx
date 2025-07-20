import { useEffect, useState } from "react";
import { axiosInstance, BOOKINGS_URLS } from "../../../../../services/Urls.ts";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ViewBookingModal from "../ViewBookingModal/ViewBookingModal.tsx";
import Header from "../../../../../shared/Header/Header.tsx";
import Swal from "sweetalert2";
import "./Bookings.css";
import type { Booking } from "../../../../../../interfaces/Bookings/Bookings.ts";



export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);

  const fetchBookings = async (page = 1, size = 5) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${BOOKINGS_URLS.GET_BOOKINGS}?page=${page}&size=${size}`
      );
      const { booking, totalCount }: { booking: Booking[]; totalCount: number } = res.data.data;
      setBookings(booking);
      setTotalResults(totalCount);
    } catch (err) {
      toast.error("Error fetching booking data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: Booking) => {
    const swalWithMuiButtons = Swal.mixin({
      customClass: {
        confirmButton: "swal2-confirm",
        cancelButton: "swal2-cancel",
      },
      buttonsStyling: false,
    });

    const result = await swalWithMuiButtons.fire({
      title: "Are you sure?",
      text: `This will permanently delete the booking with ID "${row._id}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await axiosInstance.delete(
          BOOKINGS_URLS.DELETE_BOOKING(row._id)
        );
        fetchBookings(currentPage, itemsPerPage);
        swalWithMuiButtons.fire({
          title: "Deleted!",
          text: res.data.message || `The booking has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error: any) {
        swalWithMuiButtons.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to delete the booking.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (row: Booking) => {
    setSelectedBooking(row);
    setViewModalOpen(true);
  };

  useEffect(() => {
    fetchBookings(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const columns = [
    {
      id: "status",
      label: "Room Status",
      align: "center" as "center",
      render: (row: Booking) => row.status,
    },
    {
      id: "totalPrice",
      label: "Total Price",
      align: "center" as "center",
      render: (row: Booking) => `$${row.totalPrice.toFixed(2)}`,
    },
    {
      id: "startDate",
      label: "Start Date",
      align: "center" as "center",
      render: (row: Booking) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      id: "endDate",
      label: "End Date",
      align: "center" as "center",
      render: (row: Booking) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      id: "userName",
      label: "User",
      align: "center" as "center",
      render: (row: Booking) => row.user?.userName ?? "-",
    },
    {
      id: "room",
      label: "Room",
      align: "center" as "center",
      render: (row: Booking) => row.room?.roomNumber ?? "-",
    },
  ];

  return (
    <Box p={2}>
      <Header
        title="Booking Table Details"
        description="You can check all details"
      />
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
            rows={bookings}
            totalResults={totalResults}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onPageSizeChange={(newSize) => setItemsPerPage(newSize)}
            onDelete={handleDelete}
            onView={handleView}
          />

          <ViewBookingModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            booking={selectedBooking}
          />
        </>
      )}
    </Box>
  );
}