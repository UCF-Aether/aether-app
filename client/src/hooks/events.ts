import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

export interface Event {
  event_id: number;
  profile_id: string;
  commited_at: string;
  created_at: string;
  body: Object;
  fid: number;
  type: string;
}

async function fetchDeviceEvents(deviceId?: number) {
  let query = supabase.from<Event>("events").select("*").like("type", "device_%");

  // @ts-ignore
  if (deviceId != undefined) query = query.eq("body->>device_id", deviceId);
  const { data, error } = await query;

  if (error || !data)
    throw new Error(`Unable to find device events${deviceId && "id =" + deviceId.toString()}`);
  return data;
}

function deviceEventQueryKeys(deviceId?: number) {
  if (deviceId != undefined) return ["events", "devices", deviceId];
  return ["events", "devices"];
}

export function useDeviceEvents(deviceId?: number) {
  return useQuery(deviceEventQueryKeys(deviceId), () => fetchDeviceEvents(deviceId));
}
