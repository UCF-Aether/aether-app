import { Fragment } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Panel } from './Panel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DashboardButton = styled(Button)(
  ({ theme }) => ({
    width: '100%',
    textTransform: 'none',
    justifyContent: 'flex-start',
    boxShadow: 'none',
  })
);

export function YouPanel() {
  const accountCol = (
    <Fragment>
      <Grid item >
        <AccountCircleIcon sx={{ width: 50, height: 50 }} />
      </Grid>
    </Fragment> 
  );

  const infoCol = (
    <Fragment>
      <Grid item>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
          Last update: 
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
          Active
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
          Inactive
        </Typography>
      </Grid>
      <Grid item sx={{ marginTop: 1 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
          Hello First Last
        </Typography>
      </Grid>
    </Fragment>
  );

  return (
    <Panel title='You'>
      <DashboardButton variant='contained' endIcon={<ArrowForwardIcon />}>
        Dashboard
      </DashboardButton>
      <Grid container direction='row' sx={{ p: 1 }}>
        <Grid item xs={8}>
          <Grid item container direction='column'>
            {infoCol}
          </Grid> 
        </Grid>
        <Grid item>
          <Grid item container direction='column' justifyContent='space-between'>
            {accountCol}
          </Grid> 
        </Grid>
      </Grid>
    </Panel>
  );
}
