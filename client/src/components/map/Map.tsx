import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// @ts-ignore
import { DeckGL } from "@deck.gl/react";
import { useEffect, useState } from "react";
import StaticMap from "react-map-gl";
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

const AQI_COLORS: [number, number, number, number?][] = [
  [0, 255, 0, 200],
  [0, 255, 0],
  [255, 255, 0],
  [255, 126, 0],
  [255, 0, 0],
  [143, 63, 151],
  [126, 0, 35],
];

const AQI_DOMAIN: [number, number]  = [0, 300];

const PM_COLORS = [

];

export interface MapData {
  lat: number;
  lng: number;
  value: number;
  weight?: number;
}

export interface MapProps {
  chan: string;
  hoursAgo?: number;
  timeout?: number;
}

/* eslint-disable react/no-deprecated */
export function Map(props: MapProps) {
  const radiusPixels = 20;
  const intensity = 1.0;
  const threshold = 0.003;
  
  const [after, setAfter] = useState(() => {
    let d = new Date()
    d.setHours(d.getHours() - (props.hoursAgo ?? 2));
    return d;
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [result, query] = useQuery({
    query: ReadingsDocument,
    variables: {
      chan: props.chan,
      // after: after.toISOString(),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      query();
      console.log('fetching');
    }, 5000);
    return () => clearInterval(interval);
  }, [query]);

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

  console.log(mapData);

  const layers = [
    new HeatmapLayer<MapData>({
      data: mapData,
      id: "heatmp-layer",
      pickable: false,
      getPosition: (d) => [d.lat, d.lng],
      getWeight: (d) => d.value,
      colorDomain: AQI_DOMAIN,
      colorRange: AQI_COLORS,
      aggregation: 'MEAN',
      radiusPixels,
      intensity,
      threshold,
    }),
  ];

  const getTooltip = info => {
    console.log(info);
    if (info.picked && info.object) {
      return `${mapData[info.object.value]}`;
    }
    return null;
  }

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
      </StaticMap>
    </DeckGL>
  );
}
