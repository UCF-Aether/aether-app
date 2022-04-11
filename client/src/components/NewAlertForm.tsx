import { Autocomplete, Box, Button, FormControl, Grid, Skeleton, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCreateAlert } from "../hooks/alerts";
import { useDevices } from "../hooks/devices";
import { useLayersInfo } from "../hooks/layers";
import { Error } from "./Error";

function Fetching() {
  return (
    <Skeleton 
      animation="wave" 
      variant="rectangular" 
      width="100%" 
      height="30%" 
      sx={{ my: 2 }} 
    />
  );
}


export function NewAlertForm() {
  const { isLoading, isError, devices, error } = useDevices();
  const layers = useLayersInfo();
  const [values, setValues] = useState<any>({});
  const mutation = useCreateAlert();

  if (isError) return <Error message={error.message} />
  if (isLoading) return <Fetching />

  const deviceOptions = devices.map(d => ({ ...d, label: d.name }));
  const layerOptions = Object.keys(layers).map(name => ({ label: name }));

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event, values);
    mutation.mutate({
      name: values.alertName,
      layer: values.layer,
      deviceId: values.device,
      value: values.triggerValue,
    });
  }

  const updateValue = (id: string, newValue: any) => {
    setValues({
      ...values,
      [id]: newValue,  
    });
  }
  const handleChange = (event: any) => {
    updateValue(event.target.id, event.target.value);
  }

  if (mutation.isSuccess) return <Navigate to='..' />;

  return (
    <Box
      sx={{ margin: 3 }}
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='alertName'
              fullWidth
              required
              disabled={mutation.isLoading}
              type='text'
              label='Alert Name'
              value={values.alertName ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id='device'
              disabled={mutation.isLoading}
              isOptionEqualToValue={(option, value) => option.device_id === value.device_id}
              options={deviceOptions}
              renderInput={(params) => <TextField {...params} label="Device" required />}
              onChange={ (event, newValue) => updateValue('device', (newValue as any).device_id)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id='layer'
              disabled={mutation.isLoading}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              options={layerOptions}
              renderInput={(params) => <TextField {...params} label="Layer" required />}
              onChange={ (event, newValue) => updateValue('layer', (newValue as any).label)}
            />
          </Grid>
          <Grid item>
            <TextField
              id='triggerValue'
              disabled={mutation.isLoading}
              required
              type='number'
              label='Trigger At Value'
              value={values.triggerValue ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='description'
              disabled={mutation.isLoading}
              type='text'
              multiline
              fullWidth
              label='Description'
              rows={4}
              value={values.description ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid container item xs={6} justifyContent='center'>
            <Button sx={{ marginTop: 4 }} variant='outlined' >
              Cancel
            </Button>
          </Grid>
          <Grid container item xs={6} justifyContent='center' >
            <Button sx={{ marginTop: 4 }} variant='contained' type='submit'>
              Create
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}
