import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import type { HeaderProps } from "../../../interfaces/Shared/Shared";



export default function Header({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeaderProps) {
   const theme = useTheme();
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      mb={3}
    >
      <Box>
        <Typography variant="h5" color="#1F263E" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="#323C47">
          {description}
        </Typography>
      </Box>

      {buttonText && (
        <Button
          variant="contained"
          disableElevation
          sx={{
            fontWeight: "600",
            marginRight: "100px",
            padding: "10px 40px",
            textTransform: "none",
           backgroundColor: theme.palette.mode === "dark" ? "#1f2937" : theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </Stack>
  );
}
