import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import Loader from "./Loader";
const Map = ({ lat, lng, url }) => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  //   console.log(process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY,
  });
  if (!isLoaded) return <Loader />;
  return (
    <Div>
      <GoogleMap
        zoom={15}
        center={{ lat: latitude, lng: longitude }}
        mapContainerStyle={{ width: "500px", height: "400px" }}
      >
        <MarkerF position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
      <A href={url} target="_blank">
        Place your booking here
      </A>
    </Div>
  );
};
const A = styled.a`
  font-size: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  margin-top: 5px;
  &:hover {
    border-bottom: 1px solid black;
    cursor: pointer;
    color: blue;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 10%;
  margin-left: 40%;
  margin-right: 40%;
`;
export default Map;
