import { Box } from "@mui/material";
import { Navbar } from "../../shared/HomeNavbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import WhatsappChat from './../../shared/wts/WhatsappChat';

export default function UserLayout() {
  return (
   <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      <Outlet/>
      <Footer/>
      <WhatsappChat/>
    </Box>
  )
}
