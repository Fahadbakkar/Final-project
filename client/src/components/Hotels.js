import { useEffect, useState } from "react";
import Loader from "./Loader";
import HotelCard from "./HotelCard";
import styled from "styled-components";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetch("/api/get-Hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data.result);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <div>
      {hotels.length === 0 && <Loader />}
      {hotels.length > 1 && (
        <HotelPage>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              _id={hotel._id}
              imageSrc={hotel.image}
              address={hotel.address}
              name={hotel.name}
              rating={hotel.rating}
              qualitativeBadgeText={hotel.qualitativeBadgeText}
              summary={hotel.summary}
              caption={hotel.caption}
              description={hotel.description}
              latlng={hotel.latlng}
              url={hotel.url}
              id={hotel.id}
            />
          ))}
        </HotelPage>
      )}
    </div>
  );
};
const HotelPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Hotels;
