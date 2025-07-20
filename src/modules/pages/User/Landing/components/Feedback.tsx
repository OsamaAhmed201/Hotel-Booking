import  { useRef } from "react";
import {
  Box,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
import img1 from "../../../../../assets/1.png";
import img2 from "../../../../../assets/2.png";
import img3 from "../../../../../assets/3.png";

const Feedback = () => {
  const { t } = useTranslation();
  const sliderRef = useRef<Slider | null>(null);

  const data = [
     { img: img1 },
    { img: img2 },
    { img: img3 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box
      sx={{
        pt: 2,
        pb: 10,
        px: { xs: 2, md: 10 },
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        textAlign="center"
        mb={6}
      >
        {t("feedback.title")}
      </Typography>

      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => (
          <Box key={index}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                p: { xs: 2, md: 4 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ position: "relative", flexShrink: 0 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1,
                    borderBottomRightRadius: "100px",
                  }}
                />
                <Box
                  component="img"
                  src={item.img}
                  alt={t(`feedback.items.${index}.title`)}
                  sx={{
                    width: "100%",
                    height: { xs: 250, md: 400 },
                    borderRadius: 4,
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 2,
                  }}
                  style={{ borderBottomRightRadius: "100px" }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {t(`feedback.items.${index}.title`)}
                </Typography>

                <Rating value={5} readOnly size="small" sx={{ mb: 2 }} />

                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {t(`feedback.items.${index}.text`)}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  display="block"
                  sx={{ mb: 3 }}
                >
                  {t(`feedback.items.${index}.author`)}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    style={{
                      border: "3px solid rgb(25, 118, 210)",
                      margin: "0 30px",
                    }}
                    color="primary"
                    onClick={() => sliderRef.current?.slickPrev()}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton
                    style={{ border: "3px solid rgb(25, 118, 210)" }}
                    color="primary"
                    onClick={() => sliderRef.current?.slickNext()}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Feedback;
