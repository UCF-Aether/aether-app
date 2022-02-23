import { Loader } from "@googlemaps/js-api-loader";
import { TextField, Box, Paper, Card, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { createRef, forwardRef, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

/* eslint-disable @typescript-eslint/no-unused-vars */
let map: google.maps.Map;

// eslint-disable-next-line react/display-name
const SearchBar = forwardRef<HTMLDivElement>((props: any, ref) => {
  const theme = useTheme();
  const hitWidthBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const disableBarBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div ref={ref}>
      <Card sx={{ m: 1, width: hitWidthBreakpoint ? 400 : "100%" }}>
        {disableBarBreakpoint ? (
          <SearchIcon />
        ) : (
          <TextField
            id="maps-search-bar"
            label="Search"
            variant="outlined"
            sx={{ width: "100%", height: "100%" }}
          />
        )}
      </Card>
    </div>
  );
});

interface CurrentLocationButtonProps {
  children?: JSX.Element[] | JSX.Element;
  onClick: () => void;
}

// eslint-disable-next-line react/display-name
const CurrentLocationButton = forwardRef<HTMLDivElement, CurrentLocationButtonProps>(
  (props: CurrentLocationButtonProps, ref) => {
    return (
      <div ref={ref}>
        <Card>
          <IconButton onClick={props.onClick!}>
            <LocationOnOutlinedIcon />
          </IconButton>
        </Card>
      </div>
    );
  }
);

export function DataMap() {
  const [[locationOnClick], setLocationOnClick] = useState<[() => void]>([
    () => console.log("maps not loaded"),
  ]);

  console.log(locationOnClick);
  const searchRef = createRef<HTMLDivElement>();
  const searchBar = <SearchBar ref={searchRef} />;

  const locationRef = createRef<HTMLDivElement>();
  const locationButton = <CurrentLocationButton ref={locationRef} onClick={locationOnClick} />;

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error("REACT_APP_GOOGLE_MAPS_API_KEY not defined");

    const loader = new Loader({
      apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 28.603053295127882, lng: -81.19995194984672 },
        zoom: 12,
        streetViewControl: false,
        disableDefaultUI: true,
      });

      map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchRef.current);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationRef.current);

      setLocationOnClick([
        () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                map.setCenter(pos);
              },
              () => {
                console.log("Error getting location");
              }
            );
          } else {
            console.log("Error getting location");
          }
        },
      ]);
    });
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <div id="map"></div>
      {searchBar}
      {locationButton}
    </Box>
  );
}
