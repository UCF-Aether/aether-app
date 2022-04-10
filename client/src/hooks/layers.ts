import { useQueries, useQuery, UseQueryResult } from 'react-query';
import { supabase } from '../supabaseClient';

export type LayerType = 
  'AQI'
  | 'FAST_AQI'
  | 'AQI_O3'
  | 'AQI_O3_PM'
  | 'PM2_5'
  | 'PM10'
  | 'NO'
  | 'O3'
  | 'TEMPERATURE'
  | 'REL_HUMIDITY';

interface Layer {
  domain: Array<number>;
  range: Array<string>;
  title: string;
  description?: string;
  units: string;
  triggerSource: string;
}

type LayerInfoMap = {[key: string]: Layer};

const aqiDomain = [50, 100, 150, 200, 300, 500];
const aqiRange = ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#8b3f97', '#7e0023']

const layersInfo: LayerInfoMap = {
  AQI: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'AQI',
    units: '',
    triggerSource: 'aqi',
  },
  AQI_O3: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'AQI (O³)',
    units: '',
    triggerSource: 'aqi',
  },
  AQI_O3_PM: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'AQI (O³ + PM)',
    units: '',
    triggerSource: 'aqi',
  },
  // FAST_AQI: {
  //   domain: aqiDomain,
  //   range: aqiRange,
  //   title: 'Raw Fast AQI (ZMOD4510)',
  //   units: '',
  //   triggerSource: 'aqi',
  // },
  PM2_5: {
    domain: [0, 12, 35.5, 55.5, 150.5, 250.5, 500.5], // Using 24-hour domain
    range: aqiRange,
    title: 'PM2.5',
    units: 'μg/m³',
    triggerSource: 'reading',
  },
  PM10: {
    domain: [0, 55, 155, 255, 355, 425, 604], // Using 24-hour domain
    range: aqiRange,
    title: 'PM10',
    units: 'μg/m³',
    triggerSource: 'reading',
  },
  O3: {
    domain: [0, 0.055, 0.071, 0.086, 0.106, 0.2], // Using 8-hour domain
    range: aqiRange,
    title: 'O3',
    units: 'ppm',
    triggerSource: 'reading',
  },
  // NO: {
  //   domain: [0, 54, 101, 361, 650, 1250, 2049],
  //   range: aqiRange,
  //   title: 'NO',
  //   units: 'ppb',
  //   triggerSource: 'reading',
  // },
  TEMPERATURE: {
    domain: [-18, -12, -7, -1, 4, 10, 16, 21, 27, 32, 38],  // Every 10 F
    range: [
      '#B91BE4', '#6B1BE3', '#3915DC',
      '#1267E6', '#2CB6F1', '#2CF1F1',
      '#1BDA91', '#1BDA4B', '#8EDA1B', 
      '#DADA1B' ,'#DA911B', '#DA211B',
    ],
    title: 'Temperature',
    units: '℃',
    triggerSource: 'reading',
  },
  REL_HUMIDITY: {
    domain: [36, 46, 56, 66, 76],
    range: [
      '#A647FF', '#3D6BEA', '#50DCA9', 
      '#F8FB2F', '#F6451E', '#9D2417',
    ],
    title: 'Rel. Humidity',
    units: '%',
    triggerSource: 'reading',
  },
};

export interface LayerData<TS = Date> {
  lng: number;
  lat: number;
  device_id: number;
  timestamp: TS;
  val: number
}

export interface UseLayerOptions {
  subscribe?: boolean; // Default true
  pause?: boolean;
  deviceId?: number;
}

export interface LayerResult extends Layer {
  isLoading: boolean;
  isError: boolean;
  error: any;
  data: LayerData[];
}

const fetchLayerData = async (layer: LayerType, deviceId?: number) => {
  let query = supabase
    .rpc<LayerData>('get_layer', { layer_name: layer});
  if (deviceId) query = query.eq('device_id', deviceId);
  
  const { data, error } = await query;
  if (error || !data) throw Error('Error fetching layer ' + error);

  return data.map(d => ({ ...d, timestamp: new Date(d.timestamp) }));
}

export function useLayerInfo(layer: LayerType): Layer {
  return layersInfo[layer];
}

export function useLayersInfo() {
  return layersInfo;
}

function layerQueryKeys(layer: string, options?: UseLayerOptions) {
  if (options?.deviceId) return ['layer', layer, options.deviceId];
  return ['layer', layer];
}

export function useLayer(layer: LayerType, options?: UseLayerOptions): LayerResult {
  const { isError, isLoading, data, error } = useQuery(
    layerQueryKeys(layer, options), 
    () => fetchLayerData(layer, options?.deviceId), 
  );

  const layerInfo = layersInfo[layer];

  return {
    isError,
    isLoading,
    error,
    ...layerInfo,
    data: data ?? [],
  };
}

export function useLayers(layers: LayerType[], options?: UseLayerOptions): {[key: string]: LayerResult} {
  let ret = {};
  const layerQueries = useQueries(
    layers.map(layer => {
      return {
        queryKey: layerQueryKeys(layer, options),
        queryFn: () => fetchLayerData(layer, options?.deviceId),
      }
    })
  );
  console.log('useLayers', options?.deviceId, layerQueries);
  layers.forEach((layer, i) => ret[layer] = {
    data: layerQueries[i].data,
    isError: layerQueries[i].isError,
    isLoading: layerQueries[i].isLoading,
    ...layersInfo[layer]
  });
  return ret;
}
