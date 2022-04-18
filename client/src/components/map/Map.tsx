import { MapView } from "@deck.gl/core";
import { DataFilterExtension } from "@deck.gl/extensions";
import { IconLayer, ScatterplotLayer, TextLayer } from "@deck.gl/layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import {
    Backdrop,
    Box,
    Button,
    Card,
    CircularProgress, Slider,
    Stack,
    Typography
} from "@mui/material";
import Color from "colorjs.io";
import { format } from "d3-format";
import { PickInfo } from "deck.gl";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line
import StaticMap, { GeolocateControl, Popup, _MapContext as MapContext } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import { Device } from "../../hooks/devices";
import { LayerData, useLastUpdate } from "../../hooks/layers";
import { Legend, LegendProps } from "./Legend";

const INITIAL_VIEW_STATE = {
  longitude: -81.1994990097011,
  latitude: 28.602618358121447,
  zoom: 14,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
  // transitionInterpolator: interpolator,
};

const ICON_MAPPING = {
  marker: { x: 0, y: 10, width: 128, height: 128, mask: true },
};

const UNIX_MS_HOUR = 3600 * 1000;

export interface Reading {
  val: number;
  timestamp: Date;
}

export interface MapData {
  lng: number;
  lat: number;
  timestamp: string;
  val: number;
}

export interface ColorDomain {
  color: [number, number, number];
  start: number;
}

export interface MapLegendProps extends LegendProps {
  title: string;
  description?: string;
}

export interface MapProps {
  readings: Array<LayerData>;
  layerType?: "scatterplot";
  devices?: Array<Device>;
  showDevices?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  legend: MapLegendProps;
}

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false,
});

const mapView = new MapView({
  id: "map-view",
  controller: true,
  repeat: true,
});

function genColorRanges(range: string[], domain: number[]) {
  return range.map((rng, i) => {
    const dm = domain[i];

    const startColor = new Color(rng);
    const endColor = new Color(range[i + 1] ?? rng);
    const colorRange = startColor.range(endColor);
    const width = i === domain.length - 1 ? -1 : domain[i + 1] - dm;
    return {
      start: dm,
      color: (pct: number) => colorRange(Math.min(pct, 1)).srgb.map((c: any) => c * 256),
      width,
    };
  });
}

// Given color ranges, get color for a specific value
function getColor(ranges: any, val: number) {
  const i = ranges.findIndex((cr: any) => val <= cr.start);
  if (i === -1) return ranges[ranges.length - 1].color(0);
  if (i === 0 && val < ranges[0].start) return ranges[0].color(0);

  const rangeDef = ranges[Math.max(i - 1, 0)];
  const pct = (val - rangeDef.start) / rangeDef.width;
  return rangeDef.color(pct);
}

function sliderFormat(unixTime: number) {
  const ts = new Date(unixTime);
  return (
    <Typography>
      {ts.getMonth()}/{ts.getDate()}
      <br /> {ts.getHours() || "00"}:{ts.getMinutes() || "00"}
    </Typography>
  );
}

function unixHourTrunc(unixTime: number) {
  return Math.floor(unixTime / UNIX_MS_HOUR) * UNIX_MS_HOUR;
}

// Generates marks from the current hour back numHours hours with stepHours step
function genHourlySliderMarks(
  end: Date | number,
  numHours: number,
  stepHours: number
): [number, number, any] {
  const endUnix = end instanceof Date ? end.getTime() : end;
  const endHour = unixHourTrunc(endUnix);
  const startHour = endHour - numHours * UNIX_MS_HOUR;
  const marks = Array.from(new Array(1 + numHours / stepHours), (v: any, i) => {
    const value = endHour - i * UNIX_MS_HOUR * stepHours;
    return {
      value,
      label: sliderFormat(value),
    };
  }).reverse();

  // marks.push({ value: endUnix, label: <p></p> });

  return [startHour, endHour, marks];
}

interface MapSliderProps {
  value: number;
  hour: number;
  onChange: (event: Event, newValue: number | number[]) => void;
}

function MapSlider(props: MapSliderProps) {
  const { hour, value, onChange } = props;
  const [sliderMin, sliderMax, marks] = useMemo(
    () => genHourlySliderMarks(hour, 7 * 24, 24),
    [hour]
  );

  return (
    <Box
      sx={{
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "150px",
        display: "flex",
        position: "relative",
        bottom: "150px",
      }}
    >
      <Slider
        sx={{
          width: "45vw",
          marginBottom: 1,
          position: "absolute",
          "& .MuiSlider-markLabel": {
            color: "#000",
          },
        }}
        valueLabelDisplay="auto"
        value={value}
        onChange={onChange}
        min={sliderMin}
        max={sliderMax}
        step={UNIX_MS_HOUR}
        marks={marks}
        track={false}
        valueLabelFormat={sliderFormat}
      />
    </Box>
  );
}

function MapLegend(props: LegendProps) {
  const { title, domain, range, units } = props;

  return (
    <Card
      sx={{
        zIndex: 10,
        alignSelf: "end",
        justifyContent: "center",
        display: "flex",
        position: "absolute",
        right: 5,
        top: 5,
        width: 140,
        height: 200,
      }}
    >
      <Legend title={title} domain={domain} range={range} units={units} height={100} />
    </Card>
  );
}

function MapBackdrop({ isLoading }) {
  return (
    <Backdrop sx={{ zIndex: 10, position: "absolute" }} open={!!isLoading}>
      <CircularProgress />
    </Backdrop>
  );
}

function LastUpdate(props: { curTime: Date }) {
  const last = useLastUpdate();

  if (!last) return <></>;

  return (
    <Card
      sx={{
        zIndex: 10,
        alignSelf: "end",
        justifyContent: "center",
        display: "flex",
        position: "absolute",
        left: 50,
        top: 5,
        // width: 140,
        // height: 200,
      }}
    >
      <Typography>Last Update: {last.toLocaleString()}</Typography>
    </Card>
  );
}

function getTooltip({ object }) {
  return object && `${object.val ?? object.name}`;
}

const MemoizedMapSlider = memo(MapSlider);
const MemoizedLegend = memo(MapLegend);
const MemoizedBackdrop = memo(MapBackdrop);
const MemoizedLastUpdate = memo(LastUpdate);

const f = format(".3s");
/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const { readings, isLoading, legend, showDevices, devices } = props;
  const { title, units, domain, range } = legend;
  const navigate = useNavigate();
  const [showDevicePopup, setShowDevicePopup] = useState(false);
  const [device, setDevice] = useState<Device | null>(null);
  const [popupCoords, setPopupCoords] = useState([0, 0]);
  const [slider, setSlider] = useState<number>(
    Math.floor(new Date().getTime() / UNIX_MS_HOUR) * UNIX_MS_HOUR
  );
  const [curTime, setCurTime] = useState<Date>();
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const layers: Array<any> = [];

  useEffect(() => {
    const interval = setInterval(() => setCurTime(new Date), 1000);

    return () => clearInterval(interval);
  }, []);

  // Each function takes a domain [0, 1] and returns a Color object
  const colorRanges = useMemo(() => genColorRanges(range, domain), [domain, range]);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setSlider(newValue as number);
    },
    [setSlider]
  );

  // eslint-disable-next-line
  const handleDevicePopupOnclick = useCallback((info: PickInfo<any>, event: any) => {
    setShowDevicePopup(true);
    setPopupCoords(info.coordinate);
    setDevice(info.object as Device);
  }, []);

  const DevicePopup = (
    showDevicePopup &&
    <Popup 
      longitude={popupCoords[0]} 
      latitude={popupCoords[1]}
      anchor="bottom"
      onClose={() => setShowDevicePopup(false)}
    >
      <Typography variant="subtitle2">{device?.name}</Typography>
      <Stack>
        <Typography variant="caption"><b>Lat:</b> {device?.lat}</Typography>
        <Typography variant="caption"><b>Lng:</b> {device?.lng}</Typography>
        <Typography variant="caption"><b>Last Uplink:</b> {new Date(device?.last_uplink_at).toLocaleString() ?? '-'}</Typography>
        <Button size="small" onClick={() => navigate("device/" + device.device_id)}>Show More</Button>
      </Stack>
    </Popup>
  );

  const unixCurHour = unixHourTrunc(new Date().getTime());
  if (readings) {
    layers.push([
      new ScatterplotLayer<LayerData>({
        id: "scatterplot-layer",
        data: readings,
        wrapLongitude: true,
        getPosition: (d) => [d.lng, d.lat],
        getFillColor: (d) => getColor(colorRanges, d.val),
        // @ts-ignore
        // eslint-disable-next-line
        getFilterValue: (d) => d.timestamp.getTime(), 
        filterEnabled: true,
        filterRange: [slider - UNIX_MS_HOUR / 2, slider + UNIX_MS_HOUR / 2],
        radiusMaxPixels: 100,
        radiusMinPixels: 25,
        pickable: true,
        opacity: 0.5,
        filled: true,
        updateTriggers: {
          getFillColor: [getColor, colorRanges],
        },
        extensions: [dataFilter],
      }),
      new TextLayer<LayerData>({
        id: "text-layer",
        data: readings,
        pickable: false,
        getPosition: (d) => [d.lng, d.lat],
        getText: (d) => `${f(d.val)}`.replace("−", "-"), // I'm too lazy to properly load fonts for deck.gl
        // @ts-ignore
        getFilterValue: (d) => d.timestamp.getTime(),
        filterEnabled: true,
        filterRange: [slider - UNIX_MS_HOUR / 2, slider + UNIX_MS_HOUR / 2],
        getSize: viewState.zoom > 3 ? viewState.zoom * 2.5 : 0,
        getTextAnchor: "middle",
        getAlignmentBaseline: "center",
        sizeMaxPixels: 15,
        sizeMinPixels: 0,
        extensions: [dataFilter],
      }),
    ]);
  }

  if (showDevices && devices) {
    layers.push(
      new IconLayer<Device>({
        id: "icon-layer",
        data: devices,
        pickable: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas:
          "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
        iconMapping: ICON_MAPPING,
        // eslint-disable-next-line
        getIcon: (d) => "marker",
        sizeScale: 5,
        getPosition: (d) => [d.lng, d.lat],
        // eslint-disable-next-line
        getSize: (d) => 5,
        onClick: handleDevicePopupOnclick,
      })
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DeckGL
        /* @ts-ignore */
        layers={layers}
        views={[mapView]}
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        getTooltip={getTooltip}
        style={{ position: "relative" }}
        /* @ts-ignore */
        ContextProvider={MapContext.Provider}
        /* @ts-ignore */
      >
        {/* @ts-ignore */}
        <StaticMap
          style={{ height: "100%", zIndex: 2000 }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/streets-v11"
          // @ts-ignore
          preventStyleDiffing={true}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ></StaticMap>
        <GeolocateControl />
        {DevicePopup}
      </DeckGL>
      <MemoizedLastUpdate curTime={curTime} />
      <MemoizedLegend title={title} domain={domain} range={range} units={units} />
      <MemoizedMapSlider value={slider} onChange={handleSliderChange} hour={unixCurHour} />
      <MemoizedBackdrop isLoading={isLoading} />
    </Box>
  );
}
