import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';

export interface Gateway {
  gateway_id: number;
  name: string;
  lat: number;
  lng: number;
  created_at?: Date;
  updated_at?: Date;
  loc_updated_at?: Date;
  last_uplink_at?: Date;
  last_downlink_at?: Date;
}

export interface UseDevices {
  deviceId?: number;
}

const getGatewaysQuery = async () => {
  const { data, error } = await supabase
    .from<Gateway>('gateways')
    .select('*');

  if (error || !data) throw Error('Error fetching devices ' + error);

  return data;
}


export function useGateways() {
  return useQuery('gateways', getGatewaysQuery);
}
