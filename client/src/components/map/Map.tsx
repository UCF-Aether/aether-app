import { ScatterplotLayer } from "@deck.gl/layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import Color from "colorjs.io";
import { useMemo } from "react";
import { Card, Typography } from "@mui/material";
import { Legend, LegendProps } from "./Legend";

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

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
  data: Array<MapData>;
  legend: MapLegendProps;
  rangeStart?: Date;
  rangeStop?: Date;
}

/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const { data, rangeStart, rangeStop, legend } = props;
  const { title, description, units, domain, range } = legend;

  // Each function takes a domain [0, 1] and returns a Color object
  const colorRanges = useMemo(
    () =>
      range.map((rng, i) => {
        const dm = domain[i];

        const startColor = new Color(rng);
        const endColor = new Color(range[i + 1] ?? rng);
        const colorRange = startColor.range(endColor);
        const width = (i === domain.length - 1) ? -1 : domain[i + 1] - dm;
        return { start: dm, color: (pct: number) => colorRange(Math.min(pct, 1)).srgb.map(c => c * 256), width };
      }),
    [domain, range]
  );

  // Find the right range function for `val`, and get the color in that range
  const getColor = (val: number) => {
    const i = colorRanges.findIndex((cr) => val <= cr.start);
    if (i === -1) return colorRanges[colorRanges.length - 1].color(0);
    if (i === 0 && val < colorRanges[0].start) return colorRanges[0].color(0);

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
        getFillColor: [getColor, colorRanges],
      }
    }),
  ];

  const getTooltip = ({ object }) => object && `${object.val}`;

  return (
    <>
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
      <Card sx={{ 
        zIndex: 10, 
        alignSelf: 'end', 
        justifyContent: 'center',
        display: 'flex',
        position: 'absolute', 
        right: 5, 
        top: 5,
      }}>
        <Legend title={title} domain={domain} range={range} units={units} />
      </Card>
    </>
  );
}
