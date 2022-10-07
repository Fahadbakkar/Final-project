import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import Loader from "./Loader";
const Restomap = ({ lat, lng }) => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  //   console.log(process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCZvN5cXM3-raKcmzw75mKHGyYcq70cISc",
  });
  if (!isLoaded) return <Loader />;
  return (
    <GoogleMap
      zoom={18}
      center={{ lat: latitude, lng: longitude }}
      mapContainerStyle={{ width: "700px", height: "400px" }}
    >
      <MarkerF position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default Restomap;
