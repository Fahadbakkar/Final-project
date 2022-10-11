import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavCategory from "./FavCategory";
const Favorites = () => {
  const { user } = useAuth0();

  const [value, setValue] = useState("All");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  // get the user singed in favorites and category if chosen
  useEffect(() => {
    if (user && value) {
      fetch("/api/get-favorites/" + user.email + "/" + value)
        .then((res) => res.json())
        .then((data) => {
          setData(data.result);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user, value]);
  return loading ? (
    <>
      {data.length && data.length > 0 ? (
        <div>
          <FavCategory value={value} setValue={setValue} />
        </div>
      ) : (
        ""
      )}
      <Wrapper>
        {data.length && data.length > 0 ? (
          data.map((hotel) => {
            return (
              <>
                <Favoritediv to={"/hotels/hotelDetails/" + hotel.id}>
                  <Img src={hotel.image} alt="detail of hotel" />
                  <Name>{hotel.name}</Name>
                  <Address>{hotel.address}</Address>
                </Favoritediv>
              </>
            );
          })
        ) : (
          <Pdiv>
            <P>No Favorites!</P>
          </Pdiv>
        )}
      </Wrapper>
    </>
  ) : (
    <Loader />
  );
};
const Pdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const P = styled.h1``;
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
  max-height: 800px;
  min-height: 400px;
  padding: 5px;
  max-width: 1000px;
  min-width: 550px;
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
