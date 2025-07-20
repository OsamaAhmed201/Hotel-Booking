
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Box, useTheme } from '@mui/material';
import { Typography } from '@mui/material';


export default function LazyPieChart({ bookings }: { bookings: { pending: number; completed: number } }) {
  const theme = useTheme();
  const pieData = [
    { name: "Pending", value: bookings.pending, color: "#4F46E5" },
    { name: "Completed", value: bookings.completed, color: "#8B5CF6" },
  ];
  const textColor = theme.palette.mode === "dark" ? "#ffffff" : theme.palette.text.primary;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        flex: 1,
      }}
    >
      <Box
        sx={{
          flex: "0 0 auto",
          height: { xs: 200, sm: 250 },
          width: { xs: 200, sm: 250 },
          mx: "auto",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: "200px",
          width: "100%",
        }}
      >
        {pieData.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: item.color,
                borderRadius: "50%",
                mr: 2,
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", color: textColor }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
