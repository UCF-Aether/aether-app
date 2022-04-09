import { useQuery } from "react-query";

import { supabase } from "../supabaseClient";

export type ActivationMethod = 'OTAA' | 'ABP';

export interface Device {
  device_id: number;
  name: string;
  dev_eui: string;
  lat?: number;
  lng?: number;
  created_at?: Date;
  updated_at?: Date;
  loc_updated_at?: Date;
  last_uplink_at?: Date;
  last_downlink_at?: Date;
  activation_method?: ActivationMethod;
}

export interface UseDevicesOptions {
  deviceId?: number;
}

const fetchDeviceList = async () => {
  const { data, error } = await supabase.from<Device>("devices").select("*");

  if (error || !data) throw Error(`Error fetching devices ${error}`);
  return data;
};

const fetchDevice = async (deviceId: number) => {
  const { data, error } = await supabase
    .from<Device>("devices")
    .select("*")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (error || !data) throw Error(`Error fetching device ${deviceId} ${error}`);
  return data;
};

export function useDevices() {
  const { isLoading, isError, data: devices, error } = useQuery<Device[], Error>("devices", () => fetchDeviceList());
  return { isLoading, isError, devices, error };
}

export function useDeviceInfo(deviceId: number) {
  const { isLoading, isError, data: device, error } = useQuery<Device>(["device", deviceId], () => fetchDevice(deviceId));
  return { isLoading, isError, device, error };
}
