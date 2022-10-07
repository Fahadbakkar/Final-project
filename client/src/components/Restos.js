import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import RestoCategory from "./RestoCategory";
const Restos = () => {
  const [value, setValue] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/get-restos/" + value)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(true);
      });
  }, [value]);

  return data.length >= 0 ? (
    <>
      <CategoryDiv>
        <RestoCategory value={value} setValue={setValue} />
      </CategoryDiv>
      <Wrapper>
        {data.map((resto) => {
          return (
            <Infodiv to={`/restaurants/restaurantsdetails/${resto._id}`}>
              <Img src={resto.images.medium.url} alt="thumbnail" />
              <H2>{resto.name}</H2>
              <P>{resto.category}</P>
            </Infodiv>
          );
        })}
      </Wrapper>
    </>
  ) : (
    <Loader />
  );
};
const CategoryDiv = styled.div``;
const P = styled.h4`
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-family: "Passion One", cursive;
  font-size: 20px;
`;
const H2 = styled.h2``;
const Infodiv = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(178, 34, 34);
  border-radius: 5px;
  margin-top: 2%;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const Img = styled.img`
  height: 200px;
  max-width: 400px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 30px;
  margin-left: 15%;
  margin-right: 15%;
  justify-content: center;
  align-items: center;
`;
export default Restos;
