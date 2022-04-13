import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNewDevice } from "../hooks/devices";

export interface NewDeviceFormProps {
  onCancel?: () => void;
}

export function NewDeviceForm(props?: NewDeviceFormProps) {
  const [values, setValues] = useState<any>({ lat: 0, lng: 0 });
  const mutation = useNewDevice();
  const handleCancel = props?.onCancel ?? undefined;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('submit new device');
    mutation.mutate({
      name: values.deviceName,
      devEui: values.devEui,
      lat: values.lat,
      lng: values.lng,
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

  const validateEui = (value: string) => /^[a-fA-F0-9]{16}$/.test(value);

  return (
    <Box
      sx={{ margin: 3 }}
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <FormControl sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='deviceName'
              fullWidth
              required
              disabled={mutation.isLoading}
              type='text'
              label='Device Name'
              value={values.deviceName ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='devEui'
              fullWidth
              required
              disabled={mutation.isLoading}
              type='text'
              label='Device EUI'
              value={values.devEui ?? ''}
              error={values.devEui ? !validateEui(values.devEui) : false}
              helperText='16-digit hex unique device id'
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='lng'
              required
              disabled={mutation.isLoading}
              type='number'
              label='Device Longitude'
              value={values.lng}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='lat'
              required
              disabled={mutation.isLoading}
              type='number'
              label='Device Latitude'
              value={values.lat}
              onChange={handleChange}
            />
          </Grid>
          <Grid container item xs={6} justifyContent='center'>
            <Button  variant='outlined' onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid container item xs={6} justifyContent='center' >
            <Button  variant='contained' type='submit'>
              Create
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}
