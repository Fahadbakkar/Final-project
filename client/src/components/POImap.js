import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import Loader from "./Loader";
const POImap = ({ lat, lng }) => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  //   console.log(process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCZvN5cXM3-raKcmzw75mKHGyYcq70cISc",
  });
  if (!isLoaded) return <Loader />;
  return (
    <GoogleMap
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
      mapContainerStyle={{ width: "500px", height: "200px" }}
    >
      <MarkerF position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 3%;
//   margin-bottom: 10%;
//   margin-left: 40%;
//   margin-right: 40%;
// `;
export default POImap;
