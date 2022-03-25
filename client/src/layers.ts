import { CombinedError, OperationContext, useQuery } from "urql";
import { MapData } from "./components/map/Map";
import { ReadingsDocument } from "./generated/graphql";

export type LayerType = 
  'RAW_AQI'
  | 'RAW_FAST_AQI'
  | 'RAW_PM2_5'
  | 'RAW_PM10'
  | 'RAW_NO'
  | 'RAW_O3'
  | 'AQI_1HR' 
  | 'AQI_8HR'
  | 'TEMPERATURE'
  | 'REL_HUMIDITY';

interface Layer {
  domain: Array<number>;
  range: Array<string>;
  title: string;
  description?: string;
  units: string;
}

type LayerInfoMap = {[key: string]: Layer};

const aqiDomain = [50, 100, 150, 200, 300, 500];
const aqiRange = ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#8b3f97', '#7e0023']

export const layers: LayerInfoMap = {
  RAW_AQI: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'Raw AQI',
    units: 'Index',
  },
  RAW_FAST_AQI: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'Raw Fast AQI',
    units: 'Index',
  },
  RAW_PM2_5: {
    domain: [0, 12, 35.5, 55.5, 150.5, 250.5, 500.5], // Using 24-hour domain
    range: aqiRange,
    title: 'Raw PM2.5',
    units: 'μg/m³'
  },
  RAW_PM10: {
    domain: [0, 55, 155, 255, 355, 425, 604], // Using 24-hour domain
    range: aqiRange,
    title: 'Raw PM10',
    units: 'μg/m³'
  },
  RAW_O3: {
    domain: [0, 0.055, 0.071, 0.086, 0.106, 0.2], // Using 8-hour domain
    range: aqiRange,
    title: 'Raw O3',
    units: 'ppm',
  },
  RAW_NO: {
    domain: [0, 54, 101, 361, 650, 1250, 2049],
    range: aqiRange,
    title: 'Raw NO',
    units: 'ppb'
  },
  AQI_8HR: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'AQI 8hr',
    units: 'Index',
  },
  AQI_1HR: {
    domain: aqiDomain,
    range: aqiRange,
    title: 'AQI 1hr',
    units: 'Index',
  },
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
  },
  REL_HUMIDITY: {
    domain: [36, 46, 56, 66, 76],
    range: [
      '#A647FF', '#3D6BEA', '#50DCA9', 
      '#F8FB2F', '#F6451E', '#9D2417',
    ],
    title: 'Rel. Humidity',
    units: '%',
  },
};

const testData = [
  {
    lat: -6.581689428,
    lng: 10.142188214,
    val: -81.7074561647786,
    timestamp: "2022-03-11T20:54:46.653193+00:00",
  },
  {
    lat: -70.581689428,
    lng: 109.142188214,
    val: 81.7074561647786,
    timestamp: "2022-03-11T20:54:46.653193+00:00",
  },
  {
    lat: -58.372630349,
    lng: 60.600565544,
    val: 92.6553129393213,
    timestamp: "2022-03-11T21:02:43.151513+00:00",
  },
  {
    lat: 11.827267157,
    lng: -29.536705535,
    val: 2.90051848436832,
    timestamp: "2022-03-11T21:06:27.980285+00:00",
  },
  {
    lat: 25.361857205,
    lng: -10.937446559,
    val: 105.481092551173,
    timestamp: "2022-03-11T21:28:23.370246+00:00",
  },
  {
    lat: 6.608465374,
    lng: -92.90058792,
    val: 17.7397718973236,
    timestamp: "2022-03-11T21:43:54.276599+00:00",
  },
  {
    lat: 0.608465374,
    lng: -92.90058792,
    val: 0,
    timestamp: "2022-03-11T21:43:54.276599+00:00",
  },
  {
    lat: -4.608465374,
    lng: -92.90058792,
    val: 50,
    timestamp: "2022-03-11T21:43:54.276599+00:00",
  },
  {
    lat: -14.608465374,
    lng: -92.90058792,
    val: 500,
    timestamp: "2022-03-11T21:43:54.276599+00:00",
  },
];

export interface UseLayerOptions {
  subscribe?: boolean; // Default true
  pause?: boolean;
}

export interface LayerResult extends Layer {
  queryLayer: () => void;
  readings: Array<MapData>;
  fetching: boolean;
  error?: CombinedError;
}

export function useLayer(layer: LayerType, options?: UseLayerOptions): LayerResult {
  const [result, query] = useQuery({
    query: ReadingsDocument,
    pause: options?.pause,
    variables: {
      chan: layer,
    },
  });

  const filterQuery = (d: any) => 
    d!.readingsWithin!.nodes.map((rd: any)  => ({
      lng: rd.geog.longitude,
      lat: rd.geog.latitude,
      timestamp: rd.takenAt,
      val: rd.val,
    }));

  const { data, fetching, error } = result;

  let readings: Array<MapData> = [];

  if (!fetching && !error) readings = filterQuery(data);

  return {
    ...layers[layer],
    readings,
    fetching,
    error,
    queryLayer: () => query(),
  };
}
