import { ScatterplotLayer } from "@deck.gl/layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import Color from "colorjs.io";
import { useMemo } from "react";

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const AQI_COLORS: [number, number, number, number?][] = [
  [0, 255, 0, 200],
  [0, 255, 0],
  [255, 255, 0],
  [255, 126, 0],
  [255, 0, 0],
  [143, 63, 151],
  [126, 0, 35],
];

export interface Reading {
  val: number;
  timestamp: Date;
}

interface MapData {
  lng: number;
  lat: number;
  timestamp: string;
  val: number;
}

export interface ColorDomain {
  color: [number, number, number];
  start: number;
}

export interface LegendProps {
  title: string;
  description?: string;
  colors: Array<ColorDomain>;
}

export interface MapProps {
  data: Array<MapData>;
  legend: LegendProps;
  rangeStart?: Date;
  rangeStop?: Date;
}

/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const { data, rangeStart, rangeStop, legend } = props;
  const { title, description, colors } = legend;

  const colorRanges = useMemo(
    () =>
      colors.map((co, i) => {
        if (i == colors.length - 1) 
          return { start: co.start, color: (_) => co.color, width: -1 };

        const startColor = new Color(co.color);
        const endColor = new Color(colors[i + 1].color);
        const range = startColor.range(endColor);
        const width = colors[i + 1].start - co.start;
        return { start: co.start, color: (pct: number) => range(pct).srgb, width };
      }),
    [colors]
  );

  const getColor = (val: number) => {
    const i = colorRanges.findIndex((cr) => val <= cr.start);
    if (i === -1) return colorRanges[colorRanges.length - 1].color(0);

    const rangeDef = colorRanges[Math.max(i - 1, 0)];
    const pct = (val - rangeDef.start) / rangeDef.width;
    return rangeDef.color(pct);
  }

  const layers = [
    new ScatterplotLayer<MapData>({
      id: "scatterplot-layer",
      data,
      getPosition: d => [d.lng, d.lat],
      getFillColor: d => getColor(d.val),
      radiusMaxPixels: 100,
      radiusMinPixels: 10,
      pickable: true,
      opacity: 0.8,
      filled: true,
      updateTriggers: {
        getFillColor: [getColor],
      }
    }),
  ];

  const getTooltip = ({ object }) => object && `${object.val}`;

  return (
    <DeckGL
      /* @ts-ignore */
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
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
  );
}
