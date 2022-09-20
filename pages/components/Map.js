import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";
import { useEffect, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2l0YXJhbTAxMDQiLCJhIjoiY2wyZDVqaTMxMGV4YjNpbXY1a3M4NHptbyJ9.nWEWJk3WUoyK7Es2jMV_3Q";

const Map = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [gps, setGps] = useState([80, 26.9]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: gps,
      zoom: 7,
    });

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates);
    }
    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates);
    }
    if (gps) {
      addToMap(map, gps);
    }
    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([pickupCoordinates, dropoffCoordinates], { padding: 60 });
    }
  }, [pickupCoordinates, dropoffCoordinates, gps]);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition((p) =>
        setGps([p.coords.longitude, p.coords.latitude])
      );
    } else {
      setGps([77, 26.9]);
    }
  }, []);

  const addToMap = (map, coord) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coord).addTo(map);
  };

  return <Wrapper id="map" />;
};

const Wrapper = tw.div`flex-1 h-1/2`;

export default Map;
