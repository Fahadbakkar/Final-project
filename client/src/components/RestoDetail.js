import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import FavResto from "./FavResto";
import RestoMap from "./RestoMap";
const RestoDetail = () => {
  const [resto, setResto] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { _id } = useParams();
  console.log(_id);
  useEffect(() => {
    fetch(`/api/restaurants/restaurantDetails/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setResto(data.data);
        setLoaded(true);
      });
  }, []);

  return (
    <Wrapper>
      {loaded ? (
        <>
          <Main>
            <Fulldiv>
              <Img src={resto.images.medium.url} alt="pic of resto" />
              <Infodiv>
                <Fav>
                  <H1>{resto.name}</H1>
                  <FavResto
                    name={resto.name}
                    address={resto.address}
                    image={resto.images.medium.url}
                    _id={resto._id}
                  />
                </Fav>
                <Add>{resto.address}</Add>
                <Rank>{resto.ranking}</Rank>
                <Rat>{resto.rating}</Rat>
                <A href={resto.website} target="_blank">
                  {resto.website}
                </A>
                <P>Cuisine:</P>
                {resto.cuisine.map((item) => {
                  return <Cui> {item.name}</Cui>;
                })}
              </Infodiv>
            </Fulldiv>
            {/* <RestoMap lat={resto.latitude} lng={resto.longitude} /> */}
          </Main>
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
`;
const Fav = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Img = styled.img`
  max-height: 500px;
  max-width: 500px;
`;
const P = styled.p`
  font-size: 20px;
  text-decoration: underline;
`;
const Cui = styled.li`
  font-size: 20px;
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-family: "Passion One", cursive;
`;
const A = styled.a`
  text-decoration: none;
  color: black;
  font-size: 20px;
  &:hover {
    color: blue;
    text-decoration: underline;
    background-color: transparent;
  }
`;
const Rat = styled.p`
  font-size: 30px;
  background-color: yellow;
  width: 11%;
  border-radius: 5px;
  padding: 2px;
`;

const Rank = styled.p`
  font-size: 25px;
  background-color: blue;
  padding: 2px;
  display: inline-block;
  color: white;
  border-radius: 5px;
  width: 40%;
`;
const Add = styled.p`
  font-size: 20px;
  width: 70%;
`;
const H1 = styled.h1``;
const Fulldiv = styled.div`
  display: flex;
  margin-top: 6%;
  border: 2px solid rgb(178, 34, 34);
  padding: 5%;
  max-width: 90%;
  max-height: 700px;
  background-color: #ff838f;
  margin-bottom: 5%;
`;
const Infodiv = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  justify-content: space-between;
  margin-left: 5%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default RestoDetail;
