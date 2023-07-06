import React from "react";
import Plant from "./Plant";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

//Display of the user plant collection, where he can delete and water the plant in his collection
const Garden = () => {
  const { user } = useContext(UserContext);
  const params = useParams()
  const [garden, setGarden] = useState(null);
  
  const navigate = useNavigate();

  //Fetching the individual garden
  useEffect(() => {
    fetch(`/api/garden/${params.gardenId}`)
      .then((response) => response.json())
      .then((parse) => {
        setGarden(parse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setGarden]);

  
  

  return (
    <Box>
      <h1>Garden</h1>
      {garden && (
        <Content>
          {garden.map((plant) => {
            
            return (
              <Plant key={plant.uniqueId} plant={plant} garden={garden} setGarden={setGarden}/>
            );
          })}
        </Content>
      )}

      <button onClick={() => navigate("/library")}>+</button>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 2em;
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
    border: 2px solid black;
    transition: 300ms;
    &:hover {
      background-color: white;
      color: black;
      border: none;
    }
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Content = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;





export default Garden;
