import { useContext, useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FavoriteContext } from "./FavoriteContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const FavResto = ({ name, image, address, _id }) => {
  const { favorites, setFavorites, load, setLoad } =
    useContext(FavoriteContext);
  const { user, loginWithRedirect } = useAuth0();

  //remove
  const handleRemove = (name) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== _id));

    fetch("/api/remove-from-favorites", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, id: _id }),
    })
      .then((res) => {
        setLoad(!load);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  //add
  const handleClick = () => {
    if (user) {
      const body = {
        image: image,
        name: name,
        address: address,
        id: _id,
      };
      setFavorites([...favorites, body]);

      fetch("/api/add-to-favorites", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          userEmail: user.email.toLowerCase(),
          category: "resto",
        }),
      })
        .then((res) => res.json())
        .then(setLoad(!load))

        .catch((error) => {
          console.error("error", error);
        });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <>
      {!favorites.filter((favorite) => {
        return favorite.id === _id;
      }).length ? (
        <Button onClick={handleClick}>
          <AiOutlineStar style={{ color: "#ffde4f", size: "50px" }} />
        </Button>
      ) : (
        <Remove onClick={handleRemove}>
          <AiOutlineStar style={{ color: "#c0002d", size: "50px" }} />
        </Remove>
      )}
    </>
  );
};
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
export default FavResto;
