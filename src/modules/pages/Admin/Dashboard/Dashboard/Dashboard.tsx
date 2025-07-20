import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { axiosInstance, DASHBOARD_Charts_URL } from "../../../../services/Urls";
import { toast } from "react-toastify";
import { AdminIcon, UserIcon } from "../../../../../assets/Dashboard/Home";
const LazyPieChart = React.lazy(() => import("./Charts"));

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const drawCircle = keyframes`
  from {
    stroke-dashoffset: 628;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const AnimatedContainer = styled(Box)(() => ({
  animation: `${fadeInUp} 0.8s ease-out`,
}));

const StyledCard = styled(Card)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  background: theme.palette.mode === "dark" ? "#1e1e2f" : "#f5f7fb",
  color: theme.palette.text.primary,
  borderRadius: "20px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  animation: `${fadeInUp} 0.6s ease-out`,
  animationDelay: `${delay}ms`,
  animationFillMode: "both",
  height: "120px",
  width: "100%",
 boxShadow: theme.shadows[4],
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: "2px",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));


const ChartContainer = styled(Box)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  background: theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
  animation: `${scaleIn} 0.8s ease-out`,
  animationDelay: `${delay}ms`,
  animationFillMode: "both",
}));



const BriefcaseIcon = ({ color = "#4F46E5" }: { color?: string }) => (
  <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M10 2h4c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2zm4 4V4h-4v2h4zm6 13V8H2v11h18z" />
    </svg>
  </Box>
);

const ProgressRing = ({ value, max, size = 120 }: { value: number; max: number; size?: number }) => {
  const theme = useTheme();
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  const isDark = theme.palette.mode === "dark";

  const bgStroke = isDark ? "#374151" : "#e5e7eb"; // Tailwind gray-700 vs gray-200
  const textColor = isDark ? "#ffffff" : theme.palette.text.primary;

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={bgStroke}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ animation: `${drawCircle} 2s ease-in-out 0.5s both` }}
        />
      </svg>

      {/* Center Text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600, color: textColor }}>
          Users
        </Typography>
      </Box>
    </Box>
  );
};
const UserStatsItem = ({
  icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  delay?: number;
}) => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "#ffffff" : theme.palette.text.secondary;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        animation: `${fadeInUp} 0.6s ease-out`,
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
        {icon}
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", color: textColor }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color: textColor,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};



export const DashboardHome: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axiosInstance.get(DASHBOARD_Charts_URL.GET_Dash);
        if (mounted) {
          setDashboardData(res.data.data);
          setLoading(false);
        }
      } catch {
        toast.error("Error fetching dashboard data");
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);


    const stats = useMemo(
    () => [
      { title: "Rooms", value: dashboardData?.rooms || 0,delay: 0 },
      { title: "Facilities", value: dashboardData?.facilities || 0 ,  delay: 200 },
      { title: "Ads", value: dashboardData?.ads || 0, delay: 400  },
    ],
    [dashboardData]
  );


  const userCount = dashboardData?.users?.user || 0;
  const adminCount = dashboardData?.users?.admin || 0;
  const totalUsers = userCount + adminCount;

  return (
   <Box sx={{ p: { xs: 2, md: 2 }, mb: 4 }}>

  <AnimatedContainer sx={{ mb: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
      Dashboard Overview
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Welcome back! Here's what's happening with your rooms today.
    </Typography>
  </AnimatedContainer>

  <Box
    display="flex"
    flexWrap="wrap"
    gap={3}
    sx={{ mb: 5, justifyContent: { xs: "center", sm: "flex-start" } }}
  >
    {stats.map((stat) => (
      <Box
        key={stat.title}
        sx={{
          flex: {
            xs: "1 1 100%",                    
            sm: "1 1 calc(50% - 24px)",         
            md: "1 1 calc(33.33% - 24px)",      
            lg: "1 1 calc(25% - 24px)",         
          },
          justifyContent: "center",
          alignItems: "center",
          minWidth: "260px",
          mb: 3,
        }}
      >
        <StyledCard delay={stat.delay}>
          <CardContent
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box display="flex" gap={1}>
              <StatNumber>{stat.value}</StatNumber>
              <StatLabel>{stat.title}</StatLabel>
            </Box>
            <BriefcaseIcon />
          </CardContent>
        </StyledCard>
      </Box>
    ))}
  </Box>

  {/* Charts Section */}
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      flexDirection: { xs: "column", md: "row" },
      gap: 4,
      margin: 1,
      paddingBottom: 4,
    }}
  >
    {/* Donut Chart Section */}
    <Box sx={{ flex: "1 1 60%", minWidth: "280px" }}>
      <ChartContainer delay={600}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color:
              theme.palette.mode === "dark"
                ? "#ffffff"
                : theme.palette.text.primary,
          }}
        >
          Booking Status Overview
        </Typography>
             {loading ? (
                <Skeleton variant="rectangular" width="100%" height={250} />
              ) : (
                <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={250} />}>
                  <LazyPieChart bookings={dashboardData.bookings} />
                </React.Suspense>
              )}
      </ChartContainer>
    </Box>

    {/* User Distribution Section */}
    <Box sx={{ flex: "1 1 35%", minWidth: "280px" }}>
      <ChartContainer delay={800}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            textAlign: "center",
            color:
              theme.palette.mode === "dark"
                ? "#ffffff"
                : theme.palette.text.primary,
          }}
        >
          User Distribution
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <ProgressRing value={totalUsers} max={totalUsers} size={isSmall ? 100 : 120} />
          <Box sx={{ width: "100%" }}>
            <UserStatsItem
              icon={<UserIcon color={theme.palette.text.secondary} />}
              label="User"
              value={userCount}
              color="#10B981"
              delay={1500}
            />
            <UserStatsItem
              icon={<AdminIcon color={theme.palette.text.secondary} />}
              label="Admin"
              value={adminCount}
              color="#3B82F6"
              delay={1700}
            />
          </Box>
        </Box>
      </ChartContainer>
    </Box>
  </Box>
</Box>
  );
};
