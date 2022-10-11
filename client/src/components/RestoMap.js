import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import Loader from "./Loader";
const Restomap = ({ lat, lng }) => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  //   console.log(process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY);

  const { isLoaded } = useLoadScript({
    //wasnt working when I ecrypted so i put the key itself
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY,
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
