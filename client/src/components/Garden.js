///shit to do : make something for when garden Empty, make plant image link to plant detail page

import React from "react";
import Plant from "./Plant";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "./ActionBar";
import { keyframes, css } from "styled-components";
import PlantLogo from"../Img/plant.png"

//Display of the user plant collection,
//where he can delete and water the plant in his collection
const Garden = () => {
  const { user, mode, setMode } = useContext(UserContext);
  const params = useParams();
  const [garden, setGarden] = useState(null);
  const [empty, setEmpty] = useState(false)
  console.log(mode);
  
  const navigate = useNavigate();
  // if (user === "" ) {
  //   navigate("/");
  // }
  

  //Fetching the individual garden
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/garden/${params.gardenId}`)
      .then((response) => response.json())
      .then((parse) => {
        setGarden(parse.data);
        
        if(parse.data.length === 0){
          setEmpty(true)
        }else{
          setEmpty(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setGarden]);

  

  



  return (
    <>
      <Box mode={mode} empty = {empty}>
        <h1>BLOOM</h1>

        {garden && (
          garden.length !== 0 ?
          <Content>
            {garden.map((plant) => {
              return (
                <Plant
                  key={plant.uniqueId}
                  plant={plant}
                  garden={garden}
                  setGarden={setGarden}
                  empty = {empty}
                  setEmpty={setEmpty}
                  mode ={mode }
                />
              );
            })}
          </Content>
          :
          <Empty mode = {mode}>
          <p>Your Garden is empty</p>
          
          
          
          <LogoContainer>
            <PlantImage mode = {mode} src= {PlantLogo}/>
            <Bye>Hi!</Bye>
          </LogoContainer>
          </Empty>
        )}
        {/* to go acces library */}
        <button mode = {mode} empty = {empty} onClick={() => navigate("/library")}>Add Plant</button>
        
      </Box>
      
      <ActionBar />
    </>
  );
};

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    color: #2fd896;
  }
  100% {
    transform: scale(1);
  }
`;

const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  
  padding-bottom: 200px;

  button {

    ${({ empty }) =>
      empty &&
      css`
        animation: ${bounceAnimation} 1s infinite;
      `}
    width: 100px;
    height: 50px;
    border-radius: 30px 0 0 30px;
    font-size: 1em;
    position: fixed;
    top: 45vh;
    right: 0;
    color: ${({mode}) => mode?"#7c9b8f":"#7c9b8f"} ;
    background-color: ${({mode}) => mode?"white":"#121212"} ;
    border: none;
    font-weight: 500;
    transition: 300ms;
    box-shadow:${({mode}) => mode?"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px":" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"} ;
    cursor: pointer;
    &:hover {
      scale: 1.1;
    }

    
  }

  

  h1 {
    margin: 20px 0px;
    font-weight: 500;
  }
`;

const Content = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Empty = styled.div`
display:flex ;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 20vh;
font-size:1.8em;
line-height: 45px;

.fa-arrow-right{
  margin-top: 45px;
}

.fa-pagelines{

  margin-top: 140px;
  scale: 3;
}


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
scale: 0.7;
top: 170px;
right: 5px;
transform: rotate(-20deg);
`

export default Garden;
