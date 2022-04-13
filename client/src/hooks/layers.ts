import {
  RealtimeClient,
  RealtimeSubscription,
  SupabaseRealtimePayload,
} from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { QueryClient, QueryKey, useQueries, useQuery, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

export type LayerType =
  | "AQI"
  | "FAST_AQI"
  | "AQI_O3"
  | "AQI_O3_PM"
  | "PM2_5"
  | "PM10"
  | "NO2"
  | "O3"
  | "TEMPERATURE"
  | "REL_HUMIDITY"
  | "PRESSURE"
  | "RAW_PM2_5"
  | "RAW_PM10"
  | "RAW_NO2"
  | "RAW_O3"
  | "RAW_TEMPERATURE"
  | "RAW_REL_HUMIDITY"
  | "RAW_PRESSURE";

interface Layer {
  domain: Array<number>;
  range: Array<string>;
  title: string;
  description?: string;
  units: string;
  subscribeTo: string;
}

type LayerInfoMap = { [key: string]: Layer };

const aqiDomain = [50, 100, 150, 200, 300, 500];
const aqiRange = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8b3f97", "#7e0023"];

const layersInfo: LayerInfoMap = {
  AQI: {
    domain: aqiDomain,
    range: aqiRange,
    title: "AQI",
    units: "Index",
    subscribeTo: "raw_hourly_aqi",
  },
  AQI_O3: {
    domain: aqiDomain,
    range: aqiRange,
    title: "AQI (O³)",
    units: "Index",
    subscribeTo: "raw_hourly_aqi",
  },
  AQI_O3_PM: {
    domain: aqiDomain,
    range: aqiRange,
    title: "AQI (O³ + PM)",
    units: "Index",
    subscribeTo: "raw_hourly_aqi",
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
    title: "PM2.5",
    units: "μg/m³",
    subscribeTo: "hourly_reading_stats",
  },
  PM10: {
    domain: [0, 55, 155, 255, 355, 425, 604], // Using 24-hour domain
    range: aqiRange,
    title: "PM10",
    units: "μg/m³",
    subscribeTo: "hourly_reading_stats",
  },
  O3: {
    domain: [0, 0.055, 0.071, 0.086, 0.106, 0.2], // Using 8-hour domain
    range: aqiRange,
    title: "O3",
    units: "ppm",
    subscribeTo: "hourly_reading_stats",
  },
  // NO: {
  //   domain: [0, 54, 101, 361, 650, 1250, 2049],
  //   range: aqiRange,
  //   title: 'NO',
  //   units: 'ppb',
  //   triggerSource: 'reading',
  // },
  TEMPERATURE: {
    domain: [-18, -12, -7, -1, 4, 10, 16, 21, 27, 32, 38], // Every 10 F
    range: [
      "#B91BE4",
      "#6B1BE3",
      "#3915DC",
      "#1267E6",
      "#2CB6F1",
      "#2CF1F1",
      "#1BDA91",
      "#1BDA4B",
      "#8EDA1B",
      "#DADA1B",
      "#DA911B",
      "#DA211B",
    ],
    title: "Temperature",
    units: "℃",
    subscribeTo: "reading",
  },
  REL_HUMIDITY: {
    domain: [36, 46, 56, 66, 76],
    range: ["#A647FF", "#3D6BEA", "#50DCA9", "#F8FB2F", "#F6451E", "#9D2417"],
    title: "Rel. Humidity",
    units: "%",
    subscribeTo: "reading",
  },
};

interface BaseLayerPayload {
  device_id: number;
  loc_id: number;
}

interface RawReadingPayload extends BaseLayerPayload {
  sensor_chan_id: number;
  taken_at: string;
  received_at: string;
  val: number;
}

interface ChannelReadingPayload extends BaseLayerPayload {
  chan_id: number; // These shouldn't change -> hard code them here for lookup
  hour: number;
  day: string;
  cur_time: string; // Last update...poorly named
  sum: number;
  count: number;
  max: number;
  min: number;
  avg: number;
}

interface AqiReadingPayload extends BaseLayerPayload {
  pollutant_id: number;
  hour: number;
  day: Date;
  aqi: number;
  timestamp: Date;
}

export interface LayerReading {
  loc_id: number;
  device_id: number;
  timestamp: Date;
  val: number;
}

export interface LayerReadingLocation {
  lat: number;
  lng: number;
}

interface FetchResult {
  locations: { [key: number]: LayerReadingLocation };
  readings: LayerReading[];
}

export interface LayerData<TS = Date> {
  lat: number;
  lng: number;
  timestamp: TS;
  device_id: number;
  val: number;
}

export interface UseLayerOptions {
  subscribe?: boolean; // Default true
  deviceId?: number;
  type?: "raw" | "hourly"; // Default hourly
}

export interface LayerResult extends Layer {
  isLoading: boolean;
  isError: boolean;
  error: any;
  data: LayerData[];
}

const pollutantIdToLayers: { [key: number]: LayerType[] } = {
  1: ["AQI_O3", "AQI", "AQI_O3_PM"],
  2: ["PM2_5", "AQI", "AQI_O3_PM"],
  3: ["PM2_5", "AQI", "AQI_O3_PM"],
  4: ["AQI"],
  5: ["AQI"],
  6: ["AQI"],
};

const channelIdToLayer: { [key: number]: LayerType } = {
  1: "REL_HUMIDITY",
  2: "TEMPERATURE",
  3: "AQI",
  4: "FAST_AQI",
  5: "PRESSURE",
  13: "PM2_5",
  15: "PM10",
  16: "O3",
  17: "NO2",
};

interface FetchLocation {
  loc_lat: number;
  loc_lng: number;
  loc_id: number;
}

async function fetchLocation(locId: number) {
  const { data, error } = await supabase
    .from<FetchLocation>("location")
    .select("loc_lat,loc_lng")
    .eq("loc_id", locId)
    .single();

  if (error || !data) throw new Error("Error reading location " + locId);

  return { lat: data.loc_lat, lng: data.loc_lng };
}

const fetchLayerData = async (layer: LayerType, options?: UseLayerOptions) => {
  const rawLayer = "RAW_" + layer;
  const { data, error } = await supabase
    .rpc<FetchResult>("get_layer", {
      layer_name: options?.type === "raw" ? rawLayer : layer,
      did: options.deviceId,
    })
    .single();

  if (error || !data) throw new Error("Error fetching layer " + error);

  return data;
};

function layerQueryKeys(layer: string, options?: UseLayerOptions) {
  const keys = ["layer", layer];
  if (options?.type === "raw") keys[1] = 'RAW_' + keys[1];
  if (options?.deviceId) keys.push(`${options.deviceId}`);
  console.log('keys', keys);
  return keys;
}

function flattenData(fetchData?: FetchResult) {
  return !fetchData
    ? []
    : fetchData.readings.map((d) => ({
        device_id: d.device_id,
        lat: fetchData.locations[d.loc_id].lat,
        lng: fetchData.locations[d.loc_id].lng,
        timestamp: new Date(d.timestamp),
        val: d.val,
      }));
}

function convertToDates(result: FetchResult): FetchResult {
  return {
    ...result,
    readings: result.readings.map((rd) => ({ ...rd, timestamp: new Date(rd.timestamp) })),
  };
}

//
//
// Subscription insert and update functions
//
//
//
type UTCDateArray = [number, number, number, number];
function findUpsertIndex(readings: LayerReading[], utcDate: UTCDateArray, locId: number, deviceId: number) {
  const year = utcDate[0];
  const month = utcDate[1];
  const date = utcDate[2];
  const hours = utcDate[3];

  const cmpDate = (d: Date) =>
    d.getUTCDate() === date && d.getUTCMonth() === month && d.getUTCHours() === hours;
  return readings.findIndex((element) => {
    if (element.device_id === deviceId)
      console.log(element, new Date(element.timestamp).getMonth());
    return (
      element.loc_id === locId &&
      element.device_id === deviceId &&
      cmpDate(new Date(element.timestamp))
    );
  });
}

function updateReading(
  oldData: FetchResult,
  payload: ChannelReadingPayload
): FetchResult {
  // Day doesn't have a timezone and I don't feel like changing it in the db and possibly breaking
  // something.
  const { locations, readings } = oldData;
  const datesAreAnnoying = new Date(payload.day);
  const year = datesAreAnnoying.getUTCFullYear();
  const month = datesAreAnnoying.getUTCMonth();
  const date = datesAreAnnoying.getUTCDate();
  const hours = payload.hour;

  console.log(readings, payload, year, month, date, hours);
  const upsertIndex = findUpsertIndex(readings, [year, month, date, hours], payload.loc_id, payload.device_id);
  if (upsertIndex > -1) {
    console.log("updating ", upsertIndex, " new avg", payload.avg);
    // Do update
    readings[upsertIndex].val = payload.avg;
  } else {
    console.log("Error finding update index ");
  }

  return { locations, readings };
}

function updateAqi(
  oldData: FetchResult,
  payload: AqiReadingPayload
): FetchResult {
  const { locations, readings } = oldData;

  console.log("got aqi payload update ", payload);
  const datesAreAnnoying = new Date(payload.day);
  const year = datesAreAnnoying.getUTCFullYear();
  const month = datesAreAnnoying.getUTCMonth();
  const date = datesAreAnnoying.getUTCDate();
  const hours = payload.hour;

  const upsertIndex = findUpsertIndex(readings, [year, month, date, hours], payload.loc_id, payload.device_id);
  if (upsertIndex > -1) {
    console.log("updating ", upsertIndex, " new avg", payload.aqi);
    // Do update
    readings[upsertIndex].val = payload.aqi;
  } else {
    console.log("Error finding update index ");
  }

  return { locations, readings };
}

function insertReading(oldData: FetchResult, payload: ChannelReadingPayload) {
  const { locations, readings } = oldData;
  const datesAreAnnoying = new Date(payload.day);
  const year = datesAreAnnoying.getUTCFullYear();
  const month = datesAreAnnoying.getUTCMonth();
  const date = datesAreAnnoying.getUTCDate();
  const hours = payload.hour;
  const stupidDate = new Date(Date.UTC(year, month, date, hours));

  console.log("got reading payload insert ", payload, stupidDate);

  readings.unshift({
    timestamp: stupidDate,
    device_id: payload.device_id,
    loc_id: payload.loc_id,
    val: payload.avg,
  });
  return { locations, readings };
}

function insertAqi(oldData: FetchResult, payload: AqiReadingPayload) {
  const { locations, readings } = oldData;
  const datesAreAnnoying = new Date(payload.timestamp);
  const year = datesAreAnnoying.getUTCFullYear();
  const month = datesAreAnnoying.getUTCMonth();
  const date = datesAreAnnoying.getUTCDate();
  const hours = payload.hour;
  const stupidDate = new Date(Date.UTC(year, month, date, hours));

  console.log("got aqi payload insert ", payload, stupidDate);
  readings.unshift({
    timestamp: stupidDate,
    loc_id: payload.loc_id,
    device_id: payload.device_id,
    val: payload.aqi,
  });
  return { locations, readings };
}

// Raw readings are NEVER updated
function updateRawReading(oldData: FetchResult, payload: RawReadingPayload) {
  console.warn('got raw reading update ', payload);
  return oldData;
}

function insertRawReading(oldData: FetchResult, payload: RawReadingPayload) {
  const { locations, readings } = oldData;
  const datesAreAnnoying = new Date(payload.taken_at);
  const year = datesAreAnnoying.getUTCFullYear();
  const month = datesAreAnnoying.getUTCMonth();
  const date = datesAreAnnoying.getUTCDate();
  const hours = datesAreAnnoying.getUTCHours();
  const stupidDate = new Date(Date.UTC(year, month, date, hours));

  console.log("got raw reading payload insert ", payload, stupidDate);
  readings.unshift({
    timestamp: stupidDate,
    loc_id: payload.loc_id,
    device_id: payload.device_id,
    val: payload.val,
  });
  return { locations, readings };
}

function updateLayer(
  subscribeTo: string,
  oldData: FetchResult,
  payload: SupabaseRealtimePayload<any>
): FetchResult {
  if (subscribeTo === "hourly_reading_stats")
    return updateReading(oldData, payload.new as ChannelReadingPayload);
  else if (subscribeTo === 'reading') return updateRawReading(oldData, payload.new as RawReadingPayload);
  return updateAqi(oldData, payload.new as AqiReadingPayload);
}

function insertIntoLayer(
  subscribeTo: string,
  oldData: FetchResult,
  payload: SupabaseRealtimePayload<any>
): FetchResult {
  if (subscribeTo === "hourly_reading_stats")
    return insertReading(oldData, payload.new as ChannelReadingPayload);
  else if (subscribeTo === 'reading') return insertRawReading(oldData, payload.new as RawReadingPayload);
  return insertAqi(oldData, payload.new as AqiReadingPayload);
}

function filterPayload(layer: string, payload: any) {
  if (payload.new.chan_id != undefined) return channelIdToLayer[payload.new.chan_id] === layer;
  // AQI is generated from multiple gases
  return pollutantIdToLayers[payload.new.pollutant_id].findIndex(
    (layerName) => layerName === layer
  );
}

export function useLayer(layer: LayerType, options?: UseLayerOptions): LayerResult {
  const client = useQueryClient();
  const { isError, isLoading, data, error } = useQuery(
    layerQueryKeys(layer, options),
    () => fetchLayerData(layer, options),
    { select: convertToDates, staleTime: Infinity }
  );

  const layerInfo = layersInfo[layer];


  return {
    isError,
    isLoading,
    error,
    ...layerInfo,
    data: flattenData(data),
  };
}

export function useLayers(
  layers: LayerType[],
  options?: UseLayerOptions
): { [key: string]: LayerResult } {
  let ret = {};
  const layerQueries = useQueries(
    layers.map((layer) => {
      return {
        queryKey: layerQueryKeys(layer, options),
        queryFn: () => fetchLayerData(layer, options),
        select: convertToDates,
      };
    })
  );
  layers.forEach(
    (layer, i) =>
      (ret[layer] = {
        data: flattenData(layerQueries[i].data),
        isError: layerQueries[i].isError,
        isLoading: layerQueries[i].isLoading,
        ...layersInfo[layer],
      })
  );
  return ret;
}

export function useLayerInfo(layer: LayerType): Layer {
  return layersInfo[layer];
}

export function useLayersInfo() {
  return layersInfo;
}


function useSubscriptionChannel(channel: string, getLayer: (payload: SupabaseRealtimePayload<any>) => LayerType | LayerType[]) {
  const client = useQueryClient();
  const [subscription, setSubscription] = useState<RealtimeSubscription>();

  console.log('opening subscription to', channel);
  useEffect( () => {
    const sub = supabase
      .from(channel)
      .on("INSERT", async (payload: SupabaseRealtimePayload<BaseLayerPayload>) => {
        const layer = getLayer(payload);
        if (!layer) {
          console.error(`Invalid error from payload ${payload}`);
          return;
        }

        let queries: [QueryKey, FetchResult][] = []
        if (Array.isArray(layer)) {
          queries = layer.flatMap(lyr => client.getQueriesData<FetchResult>(['layer', lyr]));
        }
        else {
          queries = client.getQueriesData<FetchResult>(['layer', layer]);
        }

        queries.forEach(async ([queryKey, data]) => {
          const { locations } = data;

          // Check if new reading is using a new location -> get lat, lng
          const locId = payload.new.loc_id;
          if (locId != undefined && !locations[locId]) {
            console.log("unknown loc_id ", locId, " fetching...");
            try {
              const { lat, lng } = await fetchLocation(locId);
              locations[locId] = { lat, lng };
              client.setQueryData<FetchResult>(queryKey, (oldData) => ({
                ...oldData,
                locations,
              }));
            } catch {
              console.error("Error fetching location for payload", payload);
              return;
            }
          }

          client.setQueryData<FetchResult>(queryKey, (old) =>
            insertIntoLayer(channel, old, payload)
          );
        });
      })
      .on("UPDATE", (payload) => {
        const layer = getLayer(payload);
        if (!layer) {
          console.error(`Invalid error from payload ${payload}`);
          return;
        }

        let queries: [QueryKey, FetchResult][] = []
        if (Array.isArray(layer)) {
          queries = layer.flatMap(lyr => client.getQueriesData<FetchResult>(['layer', lyr]));
        }
        else {
          queries = client.getQueriesData<FetchResult>(['layer', layer]);
        }

        queries.forEach(([queryKey, data]) => {
          client.setQueryData<FetchResult>(queryKey, (old) =>
            updateLayer(channel, old, payload)
          );
        });
      })
      .subscribe();

      setSubscription(sub);
      return () => { sub.unsubscribe() };
  }, []);

  return subscription;
}

function layerFromRawPayload(payload: SupabaseRealtimePayload<RawReadingPayload>) {
  const layer = channelIdToLayer[payload.new.sensor_chan_id];
  if (!layer) return null;
  return 'RAW_' + layer as LayerType;
}

function layerFromHourlyReadingPayload(payload: SupabaseRealtimePayload<ChannelReadingPayload>) {
  const layer = channelIdToLayer[payload.new.chan_id];
  if (!layer) return null;
  return layer;
}

function layersFromHourlyAqiPayload(payload: SupabaseRealtimePayload<AqiReadingPayload>) {
  const layer = pollutantIdToLayers[payload.new.pollutant_id];
  if (!layer) return null;
  return layer;
}

export function useLayerSubscriptions() {
  const rawSub = useSubscriptionChannel('reading', layerFromRawPayload)
  const hourlyReadingSub = useSubscriptionChannel('hourly_reading_stats', layerFromHourlyReadingPayload);
  const hourlyAqiSub = useSubscriptionChannel('raw_hourly_aqi', layersFromHourlyAqiPayload);

  return [rawSub, hourlyReadingSub, hourlyAqiSub];
}

// true - online ... ish
export function useSubscriptionStatus() {
  return supabase.getSubscriptions().length > 0;
}
