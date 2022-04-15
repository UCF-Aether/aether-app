import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

export type ActivationMethod = "OTAA" | "ABP";

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

export interface UseDeviceInfoOptions {
  poll?: boolean;
}

const fetchDeviceList = async () => {
  const { data, error } = await supabase.from<Device>("devices").select("*");

  if (error || !data) throw new Error(`Error fetching devices ${error}`);
  return data;
};

const fetchDevice = async (deviceId: number) => {
  const { data, error } = await supabase
    .from<Device>("devices")
    .select("*")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (error || !data) throw new Error(`Error fetching device ${deviceId} ${error}`);
  return data;
};


export function useDevices() {
  const {
    isLoading,
    isError,
    data: devices,
    error,
    refetch,
  } = useQuery<Device[], Error>("devices", () => fetchDeviceList());
  return { isLoading, isError, devices, error, refetch };
}

export function useDeviceInfo(deviceId: number, options?: UseDeviceInfoOptions) {
  const {
    isLoading,
    isError,
    data: device,
    error,
  } = useQuery<Device, Error>(["device", deviceId], () => fetchDevice(deviceId), {
    refetchInterval: options?.poll && 3000,
  });
  return { isLoading, isError, device, error };
}

interface CreateDeviceProps {
  name: string;
  devEui: string;
  lat: number;
  lng: number;
}

async function createDevice(props: CreateDeviceProps) {
  const { name, devEui, lat, lng } = props;
  console.log(props);

  const { data, error } = await supabase.rpc("create_device", {
    device_name: name,
    device_eui: devEui,
    lng,
    lat,
  });

  if (error) throw new Error("Error creating device: " + error);
  return data;
}

export function useNewDevice() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createDevice, {
    onSuccess: () => queryClient.invalidateQueries(["devices"]),
  });

  return mutation;
}
