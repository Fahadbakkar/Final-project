import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
const UserToggle = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        isAuthenticated
          ? logout({ returnTo: window.location.origin })
          : loginWithRedirect()
      }
    >
      {isAuthenticated ? `Logout` : "Login"}
    </Button>
  );
};
const Button = styled.button`
  font-weight: bold;
  border: none;
  margin-right: 20px;
  padding: 0;
  color: white;
  font-family: poppins;
  font-size: 25px;
  background: none;
  margin-left: 15px;
  height: 15%;
  &:hover {
    cursor: pointer;
    background-color: black;
    border-radius: 5px;
  }
`;
export default UserToggle;
