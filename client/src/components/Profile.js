import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import ActionBar from "./ActionBar";

//Page to display information about the user
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const navigate = useNavigate();

  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("email")
    navigate("/");
  };
  return (
    <>
      <Box>
          <h1>Profile</h1>
        {user&&
        
        <Info>
          {user.name?
          <Name>
            <>Name :</>
          </Name>
          :
          <Name>
            <input/>
            <button>Add Name</button>
          </Name>
          }
          
          
          <div>{user.email}</div>
          
          <div>Number of plants in Garden:</div>
          <div>Joined Plant on: {user.time}</div>
        </Info>}
        
        <button onClick={handleClick}>Log out</button>
      </Box>
      <ActionBar />
    </>
    
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    font-weight: 500;
    margin-bottom: 200px;
    text-align: center;
  }

  button {
    font-size: 1.1em;
    margin-top: 50px;
    background-color: white;
    padding: 10px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 150px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;



const Info = styled.div`
  background-color: white;
  width: 85vw;
  padding: 20px;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;


  
`

const Name = styled.div`
display: flex;
button{
  font-size: .9em;
  padding: 5px;
  margin: 0;

}
input{
  outline: none;
  border: none;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
`

export default Profile;
