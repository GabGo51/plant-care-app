import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import ActionBar from "./ActionBar";
import PlantLogo from"../Img/plant.png"

//Page to display information about the user
const Profile = () => {
  const { user, setUser, mode, setMode} = useContext(UserContext);
  const [name, setName] = useState(null);
  const [garden, setGarden] = useState(null);

  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  //fetching garden for length displaying number of plants 
  useEffect(() => {
    user &&
      fetch(`/api/garden/${user.gardenId}`)
        .then((response) => response.json())
        .then((parse) => {
          console.log(parse.data);
          setGarden(parse.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [user]);
  // input state
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  //signout button clearing state and local save
  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("mode")
    localStorage.removeItem("email");
    navigate("/");
  };
  //adding a name to the existing user 
  const handleName = (event, userId) => {
    event.preventDefault();

    fetch(`/api/add-name/${userId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        userId: user.gardenId,
        name: name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection

          console.log("hello");
          setUser({ ...user, name: name });
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMoon = () =>{
    setMode(false)
  }
  const handleSun = () =>{
    setMode(true)
  }

  return (
    <>
      <Box mode={mode}>
        <h1>BLOOM</h1>
        
        {user && (
          <Info mode={mode}>
            {user.name ? (
              <Name mode={mode}>
                <>{user.name}</>
              </Name>
            ) : (
              <Name mode={mode} onSubmit={handleName}>
                <input onChange={handleChange} />
                <button type="submit">Add Name</button>
              </Name>
            )}

            <div>{user.email}</div>

            <div>
              Number of plants in Garden: <span>{garden}</span>
            </div>
            <div>Joined Plant on: {user.time}</div>
          </Info>
        )}
        <button onClick={handleClick}>Log out</button>
        <LogoContainer>
          <PlantImage mode = {mode} src= {PlantLogo}/>
          <Bye>Bye!</Bye>
        </LogoContainer>
        

        
      </Box>
      
      <Toggle mode = {mode}>
      <Circle mode = {mode}></Circle>
      
      <Sun mode={mode} onClick = {handleSun}> <i class="fa-solid fa-sun"></i></Sun>
      <Moon mode={mode} onClick={handleMoon}><i class="fa-solid fa-moon"></i></Moon>
      </Toggle>
      <ActionBar />
    </>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  h1 {
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
    margin-top: 20px;
  }
  span {
    font-weight: 500;
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
  background-color: ${({mode}) => mode?"white":"#313131  "};
  width: 85vw;
  padding: 20px;
  border-radius: 30px;
  box-shadow: ${({mode}) => mode?"rgba(149, 157, 165, 0.2) 0px 8px 24px":"rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; "};
  line-height: 40px;
`;

const Name = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  button {
    font-size: 0.9em;
    padding: 5px;
    width: 100px;
    margin: 0;
  }
  input {
    outline: none;
    border: none;
    border-radius: 30px;
    width: 50%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    padding-left: 20px;
  }
`;

const Moon = styled.button`

color: ${({mode}) => mode?"black":"#DBDBDB  "};

scale: 1.1;
background-color: transparent;
border: none;
cursor: pointer;
`

const Sun = styled.button`

color: ${({mode}) => mode?"black":"#DBDBDB   "};

scale: 1.1;
background-color: transparent;
border: none;
cursor: pointer;

`
const PlantImage = styled.img`
width: 200px;
  margin-top: 50px;
  filter: ${({mode}) => mode ? "brightness(100%)" : "invert(90%)"};
  object-fit: cover;
`
const LogoContainer = styled.div`
position: relative;
`

const Bye = styled.p`
font-family: Cherry Bomb One;
position: absolute;
top: 185px;
right: 5px;
transform: rotate(-20deg);
`

const Toggle = styled.div`
position: absolute;
transition: 300ms;
display: flex;
align-items: center;
justify-content: space-between;
top: 29px;
right: 10px;
background-color: transparent;
width: 70px;
height: 32px;
border-radius: 20px;
border: ${({mode}) => mode?"2px solid black":"2px solid white  "};
padding: 2px;

`
const Circle = styled.div`
position: absolute;
transition: 300ms;
width: 30px;
height: 30px;
background-color: transparent;
border: ${({mode}) => mode?"2px solid black":"2px solid white  "};
border-radius: 50%;
transform: translateX(-7%);
transform: ${({mode}) => mode?"translateX(-9%)":"translateX(118%)"};
`

export default Profile;
