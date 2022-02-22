import { Box, Card, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface InfoOverlayProps {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
  subTitle?: string;
  open: boolean;
  onClose: () => void;
}

export function DetailsModal(props: InfoOverlayProps) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{ pointerEvents: "none", border: 0, outline: "none" }}
      hideBackdrop
    >
      <Box
        sx={{
          position: "absolute",
          float: "right",
          right: 0,
          width: "30%",
          minWidth: 325,
          height: "100vh",
          pointerEvents: "auto",
          border: 0,
          outline: "none",
          boxShadow: 24,
        }}
      >
        <Card sx={{ p: 2, width: "100%", height: "100%" }}>
          <IconButton sx={{ p: 0, marginBottom: 2 }} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            {props.title}
          </Typography>
          <Typography variant="h5">{props.subTitle}</Typography>
          <Box sx={{ p: 1, width: '100%', height: '85%' }}>
            {props.children}
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
