import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth0();

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/get-favorites/" + user.email)
      .then((res) => res.json())
      .then((data) => {
        setData(data.result.favorites);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return loading ? (
    <Wrapper>
      {data.length > 0 ? (
        data.map((hotel) => {
          return (
            <Favoritediv to={"/hotels/hotelDetails/" + hotel.id}>
              <Img src={hotel.image} alt="detail of hotel" />
              <Name>{hotel.name}</Name>
              <Address>{hotel.address}</Address>
            </Favoritediv>
          );
        })
      ) : (
        <h1>No favorites!</h1>
      )}
    </Wrapper>
  ) : (
    <Loader />
  );
};
const Address = styled.p`
  font-weight: bold;
`;
const Name = styled.p`
  font-weight: 500;
  font-size: 30px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;
const Img = styled.img`
  max-height: 400px;
  max-width: 900;
`;
const Favoritediv = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  padding: 5px;
  max-width: 1000px;
  text-decoration: none;
  color: black;
  border: 2px solid rgb(178, 34, 34);
`;
const Wrapper = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 800px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10%;
  grid-row-gap: 15px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-left: 25%;
`;
export default Favorites;
