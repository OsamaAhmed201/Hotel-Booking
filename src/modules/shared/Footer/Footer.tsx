import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: '#fcfbfbff', px: 6, py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          flexWrap: 'wrap',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Stay</Box>cation.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {t('footer.description')}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('footer.forBeginners')}
          </Typography>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            {t('footer.newAccount')}
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            {t('footer.startBooking')}
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block">
            {t('footer.usePayments')}
          </Link>
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('footer.exploreUs')}
          </Typography>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            {t('footer.ourCareers')}
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            {t('footer.privacy')}
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block">
            {t('footer.terms')}
          </Link>
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {t('footer.connectUs')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            osamaahmeddev71@gmail.com
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            01286561086
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('footer.location')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
