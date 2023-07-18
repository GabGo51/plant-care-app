import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

//Navigation from Garden to User using this component as a navBar
const ActionBar = () => {
  const { user, mode } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }
  return (
    <>
      {user && (
        <Container mode = {mode}>
          <ButtonPlant mode ={mode} to={`/garden/${user.gardenId}`} activeclassname="active">
            <p>Garden</p>
            <i className="fa-solid fa-seedling plant"></i>
          </ButtonPlant>
          <ButtonProfile mode = {mode} to="/user" activeClassName="active">
            <i className="fa-solid fa-user profile"></i>
            <p>Profile</p>
          </ButtonProfile>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  bottom: 0px;
  z-index: 100;
`;

const ButtonPlant = styled(NavLink)`
  text-decoration: none;
  color: #7c9b8f;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({mode}) => mode?"white":"#121212   "};
  width: 100%;
  border: none;
  padding: 30px;
  transition: 300ms;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  i {
    scale: 1.5;
    transition: 200ms;
  }

  p {
    font-weight: 500;
    font-size: 1.1em;
    margin-right: 20px;
    color: ${({mode}) => mode?"#7c9b8f":"#7c9b8f"};
  }

  &.active {
    border: 1.5px solid #2fd896;
    color: #2fd896;
    p{
      color: #2fd896;
    }
  }

  &:hover {
    i {
      transform: translateX(50%);
    }
  }
`;

const ButtonProfile = styled(NavLink)`
  text-decoration: none;
  color: ${({mode}) => mode?"#7c9b8f":"#7c9b8f"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({mode}) => mode?"white":"#121212   "};
  width: 100%;
  border: none;
  padding: 30px;
  transition: 300ms;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  i {
    scale: 1.5;
    transition: 200ms;
  }

  p {
    font-weight: 500;
    font-size: 1.1em;
    margin-left: 20px;
    color: ${({mode}) => mode?"#7c9b8f":"#7c9b8f"};
  }

  &.active {
    border: 1.5px solid #2fd896;
    color: #2fd896;
    p{
      color: #2fd896;
    }
    
  }
  &:hover {
    i {
      transform: translateX(-50%);
    }
  }
`;
export default ActionBar;
