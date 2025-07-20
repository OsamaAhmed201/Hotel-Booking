import React, { useState } from 'react';
import { Box, IconButton, TextField, Typography,useMediaQuery, useTheme, Paper } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const phoneNumber = '+201127141362';

export default function WhatsappChat() {

  const [message, setMessage] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chatBoxWidth = isMobile ? 300 : 380;
  const chatBoxMaxHeight = isMobile ? 400 : 500;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(message);
    const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    const whatsappUrl = isMobileDevice
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setMessage('');
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <Paper
          elevation={5}
          sx={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: chatBoxWidth,
            maxHeight: chatBoxMaxHeight,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              bgcolor: '#128C7E',
              color: 'white',
              p: 2,
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontWeight={700}>💬 Staycation Chat</Typography>
            <IconButton onClick={() => setShowForm(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, bgcolor: '#E5DDD5', p: 2, overflowY: 'auto', fontSize: 15 }}>
            <Box
              sx={{
                bgcolor: '#fff',
                border: '1px solid #ccc',
                borderRadius: 3,
                p: 2,
                maxWidth: '85%',
                mb: 2,
                fontSize: 16,
              }}
            >
              👋 مرحبًا! كيف يمكننا مساعدتك اليوم؟ يمكنك كتابة استفسارك وسنرد عليك في أقرب وقت ممكن.
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex', gap: 1, bgcolor: '#f9f9f9', borderTop: '1px solid #ddd' }}>
            <TextField
              variant="outlined"
              placeholder="اكتب رسالتك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              size="small"
              sx={{ borderRadius: 5, bgcolor: 'white' }}
            />
            <IconButton type="submit" color="success">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: '#25D366',
          color: 'white',
          width: 60,
          height: 60,
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1200,
          '&:hover': { bgcolor: '#20b758' },
        }}
        onClick={() => setShowForm(!showForm)}
      >
        <WhatsAppIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </>
  );
}
