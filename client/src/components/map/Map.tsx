import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// @ts-ignore
import * as DeckGL from "@deck.gl/react";
import StaticMap, { GeolocateControl } from "react-map-gl";
import { useQuery } from "urql";
import { ReadingsDocument } from "../../generated/graphql";

// Source data CSV
/* eslint-disable @typescript-eslint/no-unused-vars */
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const radiusPixels = 50;
  const intensity = 0.8;
  const threshold = 0.03;

  /* eslint-disable @typescript-eslint/no-unused-vars */
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
        mapStyle='mapbox://styles/mapbox/streets-v9'
        // @ts-ignore
        preventStyleDiffing={true}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl />
      </StaticMap>
    </DeckGL>
  );
}
