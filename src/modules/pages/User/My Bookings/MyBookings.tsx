import { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Chip,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, CircularProgress,
  useMediaQuery
} from '@mui/material';
import { axiosInstance, USERS_BOOKINGS } from '../../../services/Urls';
import type { UserBookings } from '../../../../interfaces/Bookings/Bookings';
import { useTheme } from '@mui/material/styles';
import { CalendarMonth, CheckCircleOutline, AccessTime, Bookmarks } from '@mui/icons-material';



type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export default function MyBookings() {
  const [bookings, setBookings] = useState<UserBookings[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getMyBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USERS_BOOKINGS.GET_USERS_BOKKINGS);
      const fetchedBookings: UserBookings[] = response.data.data.myBooking || [
        
      ];
      setBookings(fetchedBookings);
    } catch (error:any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const totalBookings = bookings.length;
  const completed = bookings.filter(b => b.status.toLowerCase() === 'completed').length;
  const pending = bookings.filter(b => b.status.toLowerCase() === 'pending').length;

  const statusColorMap = {
    Completed: 'success',
    Pending: 'warning',
    Canceled: 'error'
  } as const;

  const getMuiColorForStatus = (status: string): ChipColor => { 
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    return statusColorMap[capitalizedStatus as keyof typeof statusColorMap] || 'default';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        Home / <Typography variant="h5" sx={{ ml: 1, color: 'text.secondary' }}>My Bookings</Typography>
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card sx={{ flex: 1, minWidth: 250, borderLeft: '5px solid #1976d2' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography color="primary" fontWeight="bold" sx={{ opacity: 0.7 }}>TOTAL BOOKINGS</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalBookings} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>bookings</span></Typography>
            <Typography fontSize={12} mt={1} sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
              <Bookmarks sx={{ fontSize: 16, mr: 0.5, color: '#1976d2' }} /> Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250, borderLeft: '5px solid #4caf50' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography color="success.main" fontWeight="bold" sx={{ opacity: 0.7 }}>COMPLETED</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completed} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>successful stays</span></Typography>
            <Typography fontSize={12} mt={1} sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutline sx={{ fontSize: 16, mr: 0.5, color: '#4caf50' }} /> Success rate: {totalBookings > 0 ? Math.round((completed / totalBookings) * 100) : 0}%
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250, borderLeft: '5px solid #ff9800' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography color="warning.main" fontWeight="bold" sx={{ opacity: 0.7 }}>PENDING</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pending} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>upcoming stays</span></Typography>
            <Typography fontSize={12} mt={1} sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ fontSize: 16, mr: 0.5, color: '#ff9800' }} /> Of total bookings: {totalBookings > 0 ? Math.round((pending / totalBookings) * 100) : 0}%
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {loading ? (
        <Box textAlign="center" py={5}><CircularProgress /></Box>
      ) : isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {bookings.map((booking, index) => {
            const muiColor = getMuiColorForStatus(booking.status);

            return (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Typography fontWeight="bold">Room: {booking.room}</Typography>
                  <Typography>Total Price: ${booking.totalPrice}</Typography>
                  <Typography>
                    Start Date:
                    <CalendarMonth sx={{ fontSize: 16, mx: 1, verticalAlign: 'middle' }} />
                    {formatDate(booking.startDate)}
                  </Typography>
                  <Typography>
                    End Date:
                    <CalendarMonth sx={{ fontSize: 16, mx: 1, verticalAlign: 'middle' }} />
                    {formatDate(booking.endDate)}
                  </Typography>
                  <Box mt={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Chip
                      label={booking.status}
                      color={muiColor}
                      variant="filled"
                      sx={{
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        '.MuiChip-icon': {
                          fontSize: 18,
                          marginLeft: '4px',
                        },
                      }}
                      icon={
                        booking?.status?.toLowerCase() === 'completed' ? (
                          <CheckCircleOutline />
                        ) : booking?.status?.toLowerCase() === 'pending' ? (
                          <AccessTime />
                        ) : undefined
                      }
                    />
                    {booking.status === 'Pending' && (
                      <Button variant="contained" size="small" color="success" sx={{ textTransform: 'none' }}>Pay</Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2d3ef2ff' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Room</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Price</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => {
                const muiColor = getMuiColorForStatus(booking.status);

                return (
                  <TableRow key={index}>
                    <TableCell>🏨 {booking.room}</TableCell>
                    <TableCell>${booking.totalPrice}</TableCell>
                    <TableCell>
                      <CalendarMonth sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {formatDate(booking.startDate)}
                    </TableCell>
                    <TableCell>
                      <CalendarMonth sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      {formatDate(booking.endDate)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={muiColor}
                        variant="filled"
                        sx={{
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          '.MuiChip-icon': {
                            fontSize: 18,
                            marginLeft: '4px',
                          },
                        }}
                        icon={
                          booking?.status?.toLowerCase() === 'completed' ? (
                            <CheckCircleOutline />
                          ) : booking?.status?.toLowerCase() === 'pending' ? (
                            <AccessTime />
                          ) : undefined
                        }
                      />
                    </TableCell>
                    <TableCell>
                     {booking.status.toLowerCase() === 'pending' && (
                            <Button variant="contained" size="small" color="success" sx={{ textTransform: 'none' }}>Pay</Button>
                            )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}