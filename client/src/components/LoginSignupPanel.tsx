import { Button, Grid } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const WideButton = styled(Button)(
  ({ theme }) => ({
    width: '100%',
    textTransform: 'none',
    boxShadow: 'none',
  })
);

export function LoginSignupPanel() {
  const navigate = useNavigate();

  return (
    <Box sx={{ m: 2 }}>
      <Grid container>
        <Grid item xs={6}>
          <WideButton variant='contained' onClick={() => navigate('/auth#signin')}>Sign in</WideButton>
        </Grid>
        <Grid item xs={6}>
          <WideButton variant='outlined' onClick={() => navigate('/auth#signup')}>Sign up</WideButton>
        </Grid>
      </Grid>
    </Box>
  );
}
