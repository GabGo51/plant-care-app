import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

//Navigation from Garden to user using this component as a navBar
const ActionBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  if(!user){
    navigate("/")
  }
  return (
    <>
      {user &&
      <Container>
        <ButtonPlant to={`/garden/${user.gardenId}`} activeClassName="active">
          <p>Garden</p>
          <i className="fa-solid fa-seedling plant"></i>
        </ButtonPlant>
        <ButtonProfile to="/user" activeClassName="active">
          <i className="fa-solid fa-user profile"></i>
          <p>Profile</p>
        </ButtonProfile>
      </Container>
      }
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
  color: #7C9B8F  ;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
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
    
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 20px;
  }

  &.active {
    border: 2px solid #2fd896;
    color: #2fd896;
  }

  &:hover{

    i{
      transform: translateX(50%);
    }
  }
`;

const ButtonProfile = styled(NavLink)`
  text-decoration: none;
  color: #7C9B8F ;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
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
    
    font-weight: bold;
    font-size: 1.1em;
    margin-left: 20px;
  }

  &.active {
    border: 2px solid #2fd896;
    color: #2fd896;
  }
  &:hover{

    i{
      transform: translateX(-50%);
    }
  }
`;
export default ActionBar;
