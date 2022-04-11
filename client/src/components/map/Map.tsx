import { Deck, Layer as DeckLayer, MapView } from "@deck.gl/core";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import { Backdrop, Box, Card, CircularProgress, Slider, Typography } from "@mui/material";
import Color from "colorjs.io";
import { format } from "d3-format";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import StaticMap from "react-map-gl";
import { LayerData } from "../../hooks/layers";
import { Legend, LegendProps } from "./Legend";
import { DataFilterExtension } from "@deck.gl/extensions";

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
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
  data: Array<LayerData>;
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
      color: (pct: number) => colorRange(Math.min(pct, 1)).srgb.map((c) => c * 256),
      width,
    };
  });
}

// Given color ranges, get color for a specific value
function getColor(ranges: any, val: number) {
  const i = ranges.findIndex((cr) => val <= cr.start);
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
  const marks = Array.from(new Array(1 + numHours / stepHours), (v, i) => {
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
      <Legend title={title} domain={domain} range={range} units={units} height={100}/>
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

function getTooltip({ object }) {
  return object && `${object.val}`;
}

const MemoizedMapSlider = memo(MapSlider);
const MemoizedLegend = memo(MapLegend);
const MemoizedBackdrop = memo(MapBackdrop);

const f = format(".3s");
/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const { data, isLoading, isError, legend } = props;
  const { title, description, units, domain, range } = legend;

  const [slider, setSlider] = useState<number>(new Date().getTime());
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const mapData = useMemo(
    () => data.map((d) => ({ ...d, timestamp: d.timestamp.getTime() })),
    [data]
  );

  // Each function takes a domain [0, 1] and returns a Color object
  const colorRanges = useMemo(() => genColorRanges(range, domain), [domain, range]);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setSlider(newValue as number);
    },
    [setSlider]
  );

  const unixCurHour = unixHourTrunc(new Date().getTime());
  const layers = [
    data &&
      new ScatterplotLayer<LayerData<number>>({
        id: "scatterplot-layer",
        data: mapData,
        wrapLongitude: true,
        getPosition: (d) => [d.lng, d.lat],
        getFillColor: (d) => getColor(colorRanges, d.val),
        // @ts-ignore
        getFilterValue: (d) => d.timestamp,
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
    new TextLayer<LayerData<number>>({
      id: "text-layer",
      data: mapData,
      pickable: false,
      getPosition: (d) => [d.lng, d.lat],
      getText: (d) => `${f(d.val)}`.replace("−", "-"), // I'm too lazy to properly load fonts for deck.gl
      // @ts-ignore
      getFilterValue: (d) => d.timestamp,
      filterEnabled: true,
      filterRange: [slider - UNIX_MS_HOUR / 2, slider + UNIX_MS_HOUR / 2],
      getSize: viewState.zoom > 3 ? viewState.zoom * 2.5 : 0,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
      sizeMaxPixels: 15,
      sizeMinPixels: 0,
      extensions: [dataFilter],
    }),
  ];

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
      >
        {/* @ts-ignore */}
        <StaticMap
          style={{ height: "100%", zIndex: 2000 }}
          reuseMaps
          mapStyle="mapbox://styles/mapbox/streets-v11"
          // @ts-ignore
          preventStyleDiffing={true}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ></StaticMap>
      </DeckGL>
      <MemoizedLegend title={title} domain={domain} range={range} units={units} />
      <MemoizedMapSlider value={slider} onChange={handleSliderChange} hour={unixCurHour} />
      <MemoizedBackdrop isLoading={isLoading} />
    </Box>
  );
}
