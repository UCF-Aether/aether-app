import { Button, Grid } from "@mui/material";
import { Box, styled } from "@mui/system";

const WideButton = styled(Button)(
  ({ theme }) => ({
    width: '100%',
    textTransform: 'none',
    boxShadow: 'none',
  })
);

export function LoginSignupPanel() {
  return (
    <Box sx={{ m: 2 }}>
      <Grid container>
        <Grid item xs={6}>
          <WideButton variant='contained'>Login</WideButton>
        </Grid>
        <Grid item xs={6}>
          <WideButton variant='outlined'>Signup</WideButton>
        </Grid>
      </Grid>
    </Box>
  );
}
