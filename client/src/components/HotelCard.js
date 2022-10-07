import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
const HotelCard = ({
  _id,
  imageSrc,
  name,
  address,
  caption,
  qualitativeBadgeText,
  id,
  rating,
}) => {
  let sum = 0;

  rating.forEach((rat) => {
    sum += rat;
  });
  const average = sum / rating.length;

  return (
    <Wrapper to={`/hotels/hotelDetails/${id}`}>
      <Image src={imageSrc} alt="image of hotel" />
      <Details>
        <Name>{name}</Name>
        <BadgeDiv>
          <Art
            src={
              "https://th.bing.com/th/id/R.68871e7c0ed1a2243f4caf68cbb29af0?rik=%2bAhAIovGm0L5bg&riu=http%3a%2f%2fcliparts.co%2fcliparts%2f8TE%2fjzd%2f8TEjzdGGc.png&ehk=rViCRNCyq%2fp%2fWnOZeZEiqDz%2bhyCAzH4V2NZO6zhbGdg%3d&risl=&pid=ImgRaw&r=0"
            }
          />
          <Score
            style={{
              color:
                qualitativeBadgeText === "Very good"
                  ? "#114105"
                  : qualitativeBadgeText === "Good"
                  ? "blue"
                  : qualitativeBadgeText === "Exceptional"
                  ? "black"
                  : "#03e4fe",
            }}
          >
            {qualitativeBadgeText}
          </Score>
        </BadgeDiv>
        <Ratingdiv>
          <Sum>
            {average.toFixed(1)} <Span>Stars Rating!</Span>
          </Sum>
        </Ratingdiv>
      </Details>
    </Wrapper>
  );
};
const Span = styled.span`
  font-weight: bold;
`;
const Ratingdiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const Sum = styled.p`
  color: black;
  font-size: 30px;
  color: black;
  background-color: yellow;
  border-radius: 5px;
  padding: 2px;
`;
const BadgeDiv = styled.div`
  position: relative;
`;
const Art = styled.img`
  height: 60px;
  position: relative;
  margin-left: 25px;
  margin-top: 20px;
`;
const Details = styled.div`
  display: flex;
  flex-direction column;
`;
const Wrapper = styled(Link)`
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid rgb(178, 34, 34);
  border-radius: 5px;
  display: flex;
  width: 800px;
  color: black;
  background-color: rgb(178, 34, 34);
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`;
const Image = styled.img`
  max-height: 300px;
`;
const Name = styled.p`
  font-weight: 700;
  font-size: 30px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif; ;
`;
const Caption = styled.p``;
const Score = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-weight: 1000;
  font-family: "Passion One", cursive;
  position: absolute;
  bottom: 0;

  margin-bottom: 20px;
  font-size: 20px;
  transform: rotateZ(-45deg);
`;
export default HotelCard;
