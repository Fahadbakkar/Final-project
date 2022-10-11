import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
const Home = () => {
  const [alert, setAlert] = useState(false);
  const { user } = useAuth0();
  console.log(user);
  // to get a popup
  useEffect(() => {
    setTimeout(() => {
      setAlert(true);
    }, 3000);
  }, []);
  return (
    <>
      {alert && (
        <Alert
          style={{
            marginLeft: "35%",
            marginRight: "48%",
            backgroundColor: "#fbc02d",
            fontWeight: "bolder",
            position: "absolute",
            height: "30%",
            width: "25%",
          }}
          onClose={() => setAlert(false)}
          elevation={6}
          variant="filled"
          icon={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                backgroundColor: "black",
                borderRadius: "5px",
                marginBottom: "40px",
                padding: "5px",
              }}
            >
              {" "}
              Sign up today and get 10% off your next Tour on any partnered
              booking site!
            </h1>

            <Input
              type="email"
              placeholder="Email"
              style={{
                width: "80%",
                borderRadius: "5px",
                marginBottom: "2%",
                height: "2rem",
              }}
            />
            <Submit
              onClick={() => setAlert(false)}
              style={{
                padding: "3px",
                background: "none",
                borderRadius: "5px",
              }}
            >
              Submit
            </Submit>
          </div>
        </Alert>
      )}
      <Wrapper>
        <Welcome>
          Welcome <Span>to Montreal!</Span>
        </Welcome>
        <P>Top rated Hotels, Points of Interests & Restos</P>
      </Wrapper>
      <div>
        <Cat>
          TOUR OF MONTREAL <CatSpan>CATEGORIES</CatSpan>
        </Cat>
        <Category>
          <BottomDiv to="/hotels">
            <Img
              src="https://hotelwilson.al/wp-content/uploads/2018/06/DJI_0018.jpg"
              alt="thumbnail"
            />
            <Name>Hotels</Name>
          </BottomDiv>
          <BottomDiv to="/points-of-interests">
            <Img src="https://www.fcholidays.com/sites/default/files/styles/product_highlight/public/uploads/2019-02/Montreal%C2%A9TQFleming%2CP%20TQ-011946.jpg" />
            <Name>Point of Interests</Name>
          </BottomDiv>
          <BottomDiv to="/restaurants">
            <Img
              src="https://assets.cntraveller.in/photos/614071700adc3d1e95c7adbd/master/pass/outdoor-dining-pune-daily-all-day.jpg"
              alt="resto"
            />
            <Name>Restaurants</Name>
          </BottomDiv>
        </Category>
      </div>
      <Footer />
    </>
  );
};
const Submit = styled.button`
  width: 6rem;
  height: 2rem;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    background: black;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;
const Input = styled.input`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;

    outline: 1px blue solid;
  }
`;
const Category = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
align-items;center;
height:20vh;
margin-bottom:8%;
`;
const Name = styled.p`
  font-size: 30px;
  font-weight: bold;

  color: black;
`;
const BottomDiv = styled(Link)`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  align-items: center;
  margin-top: 5%;
  margin-right: 2%;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease;
    transform: scale(1.05);
  }
`;
const Img = styled.img`
  height: 80%;
  border-radius: 5px;
`;
const CatSpan = styled.span`
  color: rgb(178, 34, 34);
  font-weight: bold;
`;
const Cat = styled.h1`
  text-align: center;
  font-weight: bolder;
  fonst-size: 50px;
  margin-top: 1%;
`;
const P = styled.p`
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: white;
`;
const Span = styled.span`
  display: block;
`;
const Welcome = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-size: 80px;
  display: block;
  text-align: center;
  color: white;
  font-weight: 800;
  font-family: "Passion One", cursive;
`;
const Wrapper = styled.div`
  display: block;
  padding: 0px;
  margin: 0px;
  height: 50vh;
  width: 100vw;
  background-image: url("https://media.timeout.com/images/105890847/image.jpg");
  background-size: cover;
  overflow: hidden;
  background-position: center center;
`;

export default Home;
