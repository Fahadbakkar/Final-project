import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import styled from "styled-components";
import { TbMapPin } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import Map from "./Map";
import { FavoriteContext } from "./FavoriteContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { textAlign } from "@mui/system";

//
//
const HotelDetail = () => {
  let navigate = useNavigate();
  const { favorites, setFavorites, load, setLoad } =
    useContext(FavoriteContext);
  const { user, loginWithRedirect } = useAuth0();
  const { name } = useParams();

  const [comment, setComment] = useState("");
  //fetch specific hotel
  const [hotel, setHotel] = useState({});
  const [alert, setAlert] = useState(false);
  const [remove, setRemove] = useState(false);
  const [loaded, Setloaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(
    Math.floor(Math.random() * reviews.length)
  );

  useEffect(() => {
    fetch(`/api/hotels/hotelDetails/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data.data);
        Setloaded(true);
        setReviews(data.data.summary);
      });
  }, []);

  //selectRandom Review
  //   useEffect(() => {
  //     const randomSelected = () => {
  //       const newIndex = Math.floor(Math.random() * reviews.length);
  //       if (newIndex === reviewIndex) {
  //         randomSelected();
  //       } else setReviewIndex(newIndex);
  //       return;
  //     };
  //     if (reviews.length > 0) {
  //       randomSelected();
  //     }
  //     setTimeout(() => {
  //       setComment(reviews[reviewIndex]);
  //     }, 3000);
  //   }, [comment]);
  //
  // remove from favorites
  const handleRemove = (name) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== name));

    fetch("/api/remove-from-favorites", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, name: hotel.name }),
    })
      .then((res) => {
        console.log(res);
        setRemove(true);
        setLoad(!load);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  // add to favorites
  //
  const handleClick = () => {
    if (user) {
      const body = {
        image: hotel.image,
        name: hotel.name,
        address: hotel.address,
        id: hotel.id,
      };
      setFavorites([...favorites, body]);

      fetch("/api/add-to-favorites", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, userEmail: user.email.toLowerCase() }),
      })
        .then((res) => res.json())
        .then(setLoad(!load))
        .then(setAlert(true))
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      loginWithRedirect();
    }
  };

  return loaded ? (
    <Wrapper>
      {alert && (
        <Alert
          style={{
            marginLeft: "40%",
            marginRight: "48%",
            backgroundColor: "#fbc02d",
            fontWeight: "bolder",
          }}
          severity="success"
          onClose={() => setAlert(false)}
          elevation={6}
          variant="filled"
        >
          {" "}
          Added to favorites{" "}
        </Alert>
      )}
      {remove && (
        <Alert
          style={{
            marginLeft: "40%",
            marginRight: "48%",
            backgroundColor: "#f44336",
            fontWeight: "bolder",
          }}
          severity="success"
          onClose={() => setRemove(false)}
          elevation={6}
          variant="filled"
        >
          {" "}
          Removed from favorites{" "}
        </Alert>
      )}
      <NameDiv>
        <Favoritediv>
          <Name>{hotel.name}</Name>
          {!favorites.filter((favorite) => {
            return favorite.id === name;
          }).length ? (
            <Button onClick={handleClick}>
              <AiOutlineStar style={{ color: "#ffde4f", size: "50px" }} />
            </Button>
          ) : (
            <Remove onClick={handleRemove}>
              <AiOutlineStar style={{ color: "#c0002d", size: "50px" }} />
            </Remove>
          )}
        </Favoritediv>
        <p>
          <TbMapPin />
          {hotel.address}
        </p>

        <Img src={hotel.image} alt="picture of hotel" />
      </NameDiv>
      <div></div>
      <Description>
        <H1>Description</H1>
        <P>{hotel.description}</P>
      </Description>
      <Reviewdiv>
        <Reviews>Reviews</Reviews>
        {comment && <Comment>"{comment}"</Comment>}
      </Reviewdiv>
      {/* <div>
        <Map lat={hotel.lat} lng={hotel.lng} url={hotel.url} />
      </div> */}
    </Wrapper>
  ) : (
    <Loader />
  );
};
const Remove = styled.button`
  font-size: 30px;
  margin-left: 170px;
  border: none;
  background: none;
  padding: 0;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.2s linear;
    fill: red;
  }
`;
const Name = styled.h1``;
const Button = styled.button`
  border: none;
  background: none;
  padding: 0;

  font-size: 30px;
  margin-left: 170px;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.2s linear;
    fill: yellow;
  }
`;
const Favoritediv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 200px;
`;
const H1 = styled.h1`
  border-bottom: 2px solid rgb(178, 34, 34);
  width: 40%;
`;
const Reviewdiv = styled.div`
  margin-left: 15%;
  margin-right: 20%;
  margin-top: 2%;
`;
const Reviews = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-family: "Passion One", cursive;
  border-bottom: 2px solid rgb(178, 34, 34);
  width: 40%;
`;
const Comment = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  margin-top: 1%;
`;
const Img = styled.img`
  width: 600px;
`;
const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: center;
  align-items: center;
  border: solid 1px rgb(178, 34, 34);
  margin-top: 5%;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(178, 34, 34) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 5px;
`;
const Description = styled.div`
  margin-left: 15%;
  margin-right: 20%;
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-family: "Passion One", cursive;
  margin-top: 1%;
`;
const Wrapper = styled.div``;
const P = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  margin-top: 0.5%;
`;
export default HotelDetail;
