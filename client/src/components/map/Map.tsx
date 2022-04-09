import { Deck, Layer as DeckLayer } from "@deck.gl/core";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import { Box, Card, Slider } from "@mui/material";
import Color from "colorjs.io";
import { format } from "d3-format";
import { useCallback, useMemo, useRef, useState } from "react";
import StaticMap from "react-map-gl";
import { LayerData } from "../../hooks/layers";
import { Legend, LegendProps } from "./Legend";
import {DataFilterExtension} from '@deck.gl/extensions';

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
  data?: Array<LayerData>;
  isLoading?: boolean;
  isError?: boolean;
  legend: MapLegendProps;
  rangeStart?: Date;
  rangeStop?: Date;
}

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  fp64: false
});

/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const { data, isLoading, isError, rangeStart, rangeStop, legend } = props;
  const { title, description, units, domain, range } = legend;
  const f = format(".3s");

  const deckRef = useRef<Deck>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // Each function takes a domain [0, 1] and returns a Color object
  const colorRanges = useMemo(
    () =>
      range.map((rng, i) => {
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
      }),
    [domain, range]
  );

  // Find the right range function for `val`, and get the color in that range
  const getColor = useCallback(
    (val: number) => {
      const i = colorRanges.findIndex((cr) => val <= cr.start);
      if (i === -1) return colorRanges[colorRanges.length - 1].color(0);
      if (i === 0 && val < colorRanges[0].start) return colorRanges[0].color(0);

      const rangeDef = colorRanges[Math.max(i - 1, 0)];
      const pct = (val - rangeDef.start) / rangeDef.width;
      return rangeDef.color(pct);
    },
    [colorRanges]
  );

  console.log(isLoading, isError, data);
  // const mapData = (data ?? []).map(d => ({ ...d, timestamp: d.timestamp.getTime() / 1000 }))
  // console.log(mapData);

  const layers = [
    data &&
      new ScatterplotLayer<LayerData>({
        id: "scatterplot-layer",
        data,
        wrapLongitude: true,
        getPosition: d => [d.lng, d.lat],
        getFillColor: d => getColor(d.val),
        // @ts-ignore
        getFilterValue: d => d.timestamp.getTime(),
        filterEnabled: true,
        filterRange: [1648876300000, 1648896400000],
        radiusMaxPixels: 100,
        radiusMinPixels: 25,
        pickable: true,
        opacity: 0.5,
        filled: true,
        updateTriggers: {
          getFillColor: [getColor, colorRanges],
        },
        extensions:[dataFilter],
      }),
      // new TextLayer<LayerData>({
      //   id: "text-layer",
      //   data,
      //   pickable: false,
      //   getPosition: d => [d.lng, d.lat],
      //   getText: (d) => `${f(d.val)}`.replace("−", "-"), // I'm too lazy to properly load fonts for deck.gl
      //   getSize: viewState.zoom > 4.5 ? viewState.zoom * 2.5 : 0,
      //   getTextAnchor: "middle",
      //   getAlignmentBaseline: "center",
      //   sizeMaxPixels: 15,
      //   sizeMinPixels: 0,
      // }),
  ];

  const getTooltip = ({ object }) => object && `${object.val}`;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DeckGL
        /* @ts-ignore */
        layers={layers}
        viewState={viewState}
        onViewStateChange={e => setViewState(e.viewState)}
        controller={true}
        getTooltip={getTooltip}
        style={{ position: "relative" }}
        /* @ts-ignore */
        ref={deckRef}
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
      <Card
        sx={{
          zIndex: 10,
          alignSelf: "end",
          justifyContent: "center",
          display: "flex",
          position: "absolute",
          right: 5,
          top: 5,
        }}
      >
        <Legend title={title} domain={domain} range={range} units={units} />
      </Card>
      <Box
        sx={{
          zIndex: 10,
          alignItems: "center",
          justifyContent: "center",
          width: '100%',
          display: "flex",
          position: "relative",
          bottom: '40px',
        }}
      >
        <Slider sx={{ width: '50vh'}} defaultValue={30} step={10} marks min={10} max={110} />
      </Box>
    </Box>
  );
}
