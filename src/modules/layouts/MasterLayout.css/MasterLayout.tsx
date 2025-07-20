import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { theme } from "../../services/Theme";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import { Navbar } from "../../shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function MasterLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("home");
   const { darkMode } = useThemeContext();
  const isMobile = useMediaQuery(theme(darkMode).breakpoints.down("md"));

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
  };

  const SIDEBAR_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 64;

  const currentSidebarWidth = isMobile
    ? 0
    : sidebarCollapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        onClose={handleSidebarClose}
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
      />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar
          sidebarWidth={currentSidebarWidth}
          onMobileMenuClick={handleSidebarToggle}
        />

        <Box sx={{ flexGrow: 1, marginLeft: 2 , marginTop: 10 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
