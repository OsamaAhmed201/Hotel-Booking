import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ViewBookingModal({ open, onClose, booking }: any) {
  if (!booking) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: { xs: 300, sm: 400, md: 450 },
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Booking Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <DetailItem label="Status" value={booking.status} />
          <DetailItem label="User" value={booking.user?.userName} />
          <DetailItem label="Room Number" value={booking.room?.roomNumber} />
          <DetailItem
            label="Start Date"
            value={new Date(booking.startDate).toLocaleDateString()}
          />
          <DetailItem
            label="End Date"
            value={new Date(booking.endDate).toLocaleDateString()}
          />
          <DetailItem
            label="Total Price"
            value={`$${booking.totalPrice?.toFixed(2)}`}
          />
        </Box>
      </Box>
    </Modal>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="background.default"
      borderRadius={2}
      px={2}
      py={1.5}
      mb={1.5}
      boxShadow={1}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: 12,
          letterSpacing: 0.5,
          mb: 0.5
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'text.primary',
          fontWeight: 400,
          fontSize: 14
        }}
      >
        {value ?? '-'}
      </Typography>
    </Box>
  );
}
