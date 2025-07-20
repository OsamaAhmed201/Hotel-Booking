import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import '../Landing.module.css';
import img1 from '../../../../../assets/1.png';
import img2 from '../../../../../assets/2.png';
import img3 from '../../../../../assets/3.png';
import img4 from '../../../../../assets/4.png';
import img5 from '../../../../../assets/5.png';
import img6 from '../../../../../assets/6.png';
import img7 from '../../../../../assets/7.png';
import img8 from '../../../../../assets/8.png';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CardHome() {
  const { t } = useTranslation();
  const { darkMode } = useThemeContext();

  const firstRow = [
    { title: 'Tabby Town', key: 'tabbyTown', img: img1, popular: true },
    { title: 'Anggana', key: 'anggana', img: img2 },
    { title: 'Seattle Rain', key: 'seattleRain', img: img3 },
    { title: 'Wodden Pit', key: 'woddenPit', img: img4 },
  ];

  const secondRow = [
    { title: 'Green Park', key: 'greenPark', img: img5 },
    { title: 'Podo Wae', key: 'podoWae', img: img6 },
    { title: 'Silver Rain', key: 'silverRain', img: img7 },
    { title: 'Cashville', key: 'cashville', img: img8, popular: true },
  ];

  const renderCards = (items: typeof firstRow) =>
    items.map(({ title, key, img, popular }) => (
      <Paper
        key={title}
        elevation={0}
        sx={{
          flex: 1,
          p: 2,
          backgroundColor: 'transparent',
          '&:hover': {
            boxShadow: 1,
            transform: 'scale(1.04)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <img style={{ width: '100%' }} src={img} alt={title} />
          <h3 style={{ margin: '10px 0' }}>{title}</h3>
          <p style={{ color: '#B0B0B0', fontSize: '13px' }}>
            {t(`cardHome.titles.${key}`)}
          </p>
          {popular && (
            <p
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#f14b99ff',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                zIndex: 3,
                margin: '0',
              }}
              className='discound'
            >
              {t('cardHome.popularChoice')}
            </p>
          )}
        </Box>
      </Paper>
    ));

  return (
    <Container
      sx={{
        py: 10,
        color: darkMode ? '#fff' : '#1e293b',
      }}
      maxWidth='lg'
    >
      <h2 style={{ margin: '20px' }}>{t('cardHome.section1Title')}</h2>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        {renderCards(firstRow)}
      </Box>

      <h2 style={{ margin: '20px' }}>{t('cardHome.section2Title')}</h2>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        {renderCards(secondRow)}
      </Box>
    </Container>
  );
}
