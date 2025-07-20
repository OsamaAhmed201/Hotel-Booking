import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { axiosInstance, Facilities_URL } from "../../../../../services/Urls";

export default function ViewModel({ open, onClose, Ads }: any) {
  if (!Ads) return null;

  const { room, createdBy, createdAt, isActive } = Ads;
const [facilityNames, setFacilityNames] = useState<string[]>([]);

  useEffect(() => {
  const fetchFacilities = async () => {
    if (!room?.facilities?.length) return;

    try {
      const promises = room.facilities.map((id: string) =>
        axiosInstance.get(Facilities_URL.GET_facilities_DETAILS(id))
      );

      const responses = await Promise.all(promises);
      console.log(responses)
      const names = responses.map((res) => res.data.data.name); // Adjust depending on your API response
      setFacilityNames(names);
    } catch (error) {
      console.error("Failed to fetch facilities", error);
    }
  };

  fetchFacilities();
}, [room?.facilities]);

  return (
    <Modal open={open} onClose={onClose}>
        
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: { xs: 320, sm: 500, md: 600 },
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Ad Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>

          
        </Box>

        <Divider  />

        <Box display="flex" flexDirection={'column'} flexWrap="wrap" gap={2}>
              {room?.images?.length > 0 && (
          <Box   mt={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: 12,
                letterSpacing: 0.5,
                mb: 1,
                textAlign: "center",
              }}
            >
              Room Images
            </Typography>

            <Box display="flex" alignItems={'center'} justifyContent={'center'} width={'100%'} flexWrap="wrap" gap={2}>
              {room.images.map((imgUrl: string, index: number) => (
                <Box
                  key={index}
                  component="img"
                  src={imgUrl}
                  alt={`Room Image ${index + 1}`}
                  sx={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
          <DetailItem label="Created By" value={createdBy?.userName} />
          <DetailItem label="Room Number" value={room?.roomNumber} />
          <DetailItem label="Price" value={`$${room?.price}`} />
          <DetailItem label="Capacity" value={room?.capacity} />
          <DetailItem label="Discount" value={`${room?.discount}%`} />
          <DetailItem label="Active" value={isActive ? "Yes" : "No"} />
          <DetailItem label="Created At" value={new Date(createdAt).toLocaleString()} />

        {facilityNames.length > 0 && (
  <DetailItem label="Facilities" value={facilityNames.join(", ")} />
)}
        </Box>

      
      </Box>
    </Modal>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <Box
      flexBasis={{ xs: "100%", sm: "48%" }}
      flexGrow={1}
      display="flex"
      flexDirection="column"
      bgcolor="background.default"
      borderRadius={2}
      px={2}
      py={1.5}
      boxShadow={1}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: 12,
          letterSpacing: 0.5,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          fontWeight: 400,
          fontSize: 14,
          wordBreak: "break-word",
        }}
      >
        {value ?? "-"}
      </Typography>
    </Box>
  );
}
