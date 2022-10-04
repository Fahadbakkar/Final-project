import styled from "styled-components";
import Footer from "./Footer";
const AboutUs = () => {
  return (
    <>
      <Wrapper>
        <Title>About Us</Title>
        <Description>
          Montreal is a beautiful city with a lot to offer tourists. But it can
          be overwhelming to try to figure out where to stay and what to do
          while you're here. That's where we come in.Tour of Montreal is a
          company that provides tours of the city for visitors. We also help
          them find the best accommodations and activities so they can make the
          most of their trip.We started in 2013 with just a few employees, but
          we've grown a lot since then. We now have a team of dedicated
          professionals who are passionate about helping people experience all
          that Montreal has to offer.
        </Description>
        <img
          src="https://thumbs.dreamstime.com/b/canada-quebec-montreal-black-white-sunrise-sunset-city-panorama-landscape-horizon-buildings-skyline-flat-icon-logo-shape-113792107.jpg"
          alt="montreal"
        />
      </Wrapper>
      <Footer />
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-bottom: 5px solid black;
  border-bottom-style: double;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  word-wrap: break-word;
  width: 700px;
  font-size: 22px;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
export default AboutUs;
