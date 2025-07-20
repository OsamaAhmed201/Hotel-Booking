import { useEffect, useState } from "react";
import Header from "../../../../../shared/Header/Header.tsx";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { axiosInstance, USERS_URLS } from "../../../../../services/Urls.ts";
import { CircularProgress, Box } from "@mui/material";
import UserDetailsModal from "../UsersData/UserDetailsModal.tsx";
import { toast } from "react-toastify";
import type { User } from "../../../../../../interfaces/Auth/AuthContextType.ts";



const columns = [
  { id: "userName", label: "Name", align: "center" as "center", render: (row: User) => row.userName },
  {
    id: "profileImage",
    align: "center" as "center",
    label: "Profile",
    render: (row: User) => (
      <img
        src={row.profileImage || "/images/placeholder.jpg"}
        alt="Profile"
        style={{
          width: 70,
          height: 70,
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />
    ),
  },
  { id: "email", label: "Email", align: "center" as "center", render: (row: User) => row.email },
  { id: "country", label: "Country", align: "center" as "center", render: (row: User) => row.country },
  { id: "role", label: "Role", align: "center" as "center", render: (row: User) => row.role },
];

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);

  const fetchUsers = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${USERS_URLS.GET_ALL_USERS}?page=${page}&size=${size}`
      );

      const userList: User[] = response.data?.data?.users || [];
      const totalCount = response.data?.data?.totalCount || userList.length;

      const formattedUsers: User[] = userList.map((user: User) => ({
        ...user, 
        userName: user.userName || "N/A",
        profileImage: user.profileImage || "",
        email: user.email || "N/A",
        country: user.country || "N/A",
        role: user.role || "N/A",
      }));

      setRows(formattedUsers);
      setTotalResults(totalCount);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <Header
        title="Users Table"
        description="All registered users"
        onButtonClick={() => console.log("Redirect to Add User")}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <SharedTable
            columns={columns}
            rows={rows}
            totalResults={totalResults}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onPageSizeChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
            onView={(row: User) => {
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
          />
          <UserDetailsModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
}