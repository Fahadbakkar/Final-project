import UserToggle from "./UserToggle";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Wrapper>
      <div>
        <H1 to="/">Tour of Montreal</H1>
      </div>
      <AboutDiv>
        {isAuthenticated && (
          <Favorite to="/favorites">
            Favorites
            <AiOutlineStar />
          </Favorite>
        )}
        <AboutUsText to="/aboutUs">About us</AboutUsText>
        <UserToggle />
      </AboutDiv>
    </Wrapper>
  );
};
const H1 = styled(Link)`
  margin-left: 5px;
  text-decoration: none;
  font-weight: bold;
  color: white;
  font-size: 32px;
`;
const Favorite = styled(Link)`
  display: flex;
  margin-right: 14px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  font-family: poppins;
  font-weight: bold;
  &:hover {
    border-bottom: 1px solid black;
    cursor: pointer;
    background-color: yellow;
    color: black;
    border-radius: 5px;
  }
`;
const AboutUsText = styled(Link)`
  margin-right: 14px;
  margin-left: 10px;
  text-decoration: none;
  color: white;
  font-family: poppins;
  font-weight: bold;
  font-size: 25px;

  &:hover {
    border-bottom: 1px solid black;
    cursor: pointer;
  }
`;
const AboutDiv = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(178, 34, 34);
  color: white;
  height: 10vh;
`;
export default Header;
