// @ts-ignore
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// @ts-ignore
import { AmbientLight, LightingEffect, PointLight } from "@deck.gl/core";
// @ts-ignore
import DeckGL from "@deck.gl/react";
import { useEffect, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";


// Source data CSV
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight1, pointLight2 });

const material = {
  ambient: 1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const INITIAL_VIEW_STATE = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

function getTooltip({ object }) {
  if (!object) {
    return null;
  }
  const lat = object.position[1];
  const lng = object.position[0];
  const count = object.points.length;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
    ${count} Accidents`;
}

/* eslint-disable react/no-deprecated */
export function DataMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    require("d3-request").csv(DATA_URL, (error, response) => {
      if (!error) {
        setData(response.map((d) => [Number(d.lng), Number(d.lat)]));
      }
    });
  }, []);
  const mapStyle = MAP_STYLE;
  const radius = 1000;
  const upperPercentile = 100;
  const coverage = 1;
  const google: boolean = false;

  const layers = [
    new HeatmapLayer({
      id: "heatmap",
      data,
      getPosition: (d) => d,
      getWeight: (d) => 1,
      aggregation: "SUM",
      // @ts-ignore
      colorRange,
      debounceTimeout: 500,
    }),
  ];

  return (
    <DeckGL
      /* @ts-ignore */
      layers={layers}
      effects={[lightingEffect]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      {/* @ts-ignore */}
      <Map
        style={{ height: "100%", zIndex: 2000 }}
        reuseMaps
        mapStyle={mapStyle}
        // @ts-ignore
        preventStyleDiffing={true}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl />
      </Map>
    </DeckGL>
  );
}
