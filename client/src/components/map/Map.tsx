import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// @ts-ignore
import { AmbientLight, LightingEffect, PointLight, Position2D } from "@deck.gl/core";
// @ts-ignore
import DeckGL from "@deck.gl/react";
import { useEffect, useState } from "react";
import StaticMap, { GeolocateControl } from "react-map-gl";
import { useQuery } from "urql";
import { ReadingsDocument } from "../../generated/graphql";

// Source data CSV
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

export interface MapData {
  lat: number;
  lng: number;
  value: number;
  weight?: number;
}

export interface MapProps {
  chan: string;
}

/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const mapStyle = MAP_STYLE;
  const radiusPixels = 30;
  const intensity = 1;
  const threshold = 0.03;

  const [result, reexecuteQuery] = useQuery({
    query: ReadingsDocument,
    variables: { chan: props.chan },
  });

  let mapData: Array<MapData> = [];

  const { data, fetching, error } = result;

  if (!fetching && !error && data) {
    mapData =
      data.readingsWithin?.nodes
        .filter((r) => r != null && r != undefined)
        .map((reading) => ({
          value: reading!.val!,
          lat: reading!.geog!.latitude,
          lng: reading!.geog!.longitude,
        })) || [];
  }

  // console.log(mapData);

  const layers = [
    new HeatmapLayer<MapData>({
      data: mapData,
      id: "heatmp-layer",
      pickable: false,
      getPosition: (d) => [d.lat, d.lng],
      getWeight: (d) => d.weight ?? 1,
      radiusPixels,
      intensity,
      threshold,
    }),
  ];

  return (
    <DeckGL
      /* @ts-ignore */
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      {/* @ts-ignore */}
      <StaticMap
        style={{ height: "100%", zIndex: 2000 }}
        reuseMaps
        mapStyle={mapStyle}
        // @ts-ignore
        preventStyleDiffing={true}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl />
      </StaticMap>
    </DeckGL>
  );
}
