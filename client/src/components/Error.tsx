import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export const Error = ({ message = "" }) => {
  return (
    <Box>
      <ErrorIcon color="error" />
      <Typography>{message}</Typography>
    </Box>
  );
};
