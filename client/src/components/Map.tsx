import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let map: google.maps.Map;

export function DataMap() {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error("REACT_APP_GOOGLE_MAPS_API_KEY not defined");

    const loader = new Loader({
      apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  });

  return <div id="map"></div>;
}
