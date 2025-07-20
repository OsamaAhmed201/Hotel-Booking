
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function UserDetailsModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: any;
}) {
  if (!user) return null;

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle style={{ fontSize: '25px', fontWeight: 'bold', color: 'rgb(113, 113, 240)' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {user.userName}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Box display="flex" gap={2}>
        <DialogContent dividers>
          <Box mb={2}>
            <Typography>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Email: </span>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>{user.email}</span>
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Phone: </span>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>{user.phoneNumber}</span>
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Country: </span>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>{user.country}</span>
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Role: </span>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>{user.role}</span>
            </Typography>
          </Box>
        </DialogContent>

        <Box flex={1} p={2}>
          {user.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          )}
        </Box>
      </Box>

      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}