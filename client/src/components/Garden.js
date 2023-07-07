import React from "react";
import Plant from "./Plant";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "./ActionBar";
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
    <>
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

        <button onClick={() => navigate("/library")}>Add Plant</button>
      </Box>
      <ActionBar />
    </>
    
  );
};

const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  

  button {
    width: 100px;
    height: 50px;
    border-radius: 30px;
    font-size: 1em;
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: white;
    color: #7C9B8F;
    border: none;
    font-weight: 500;
    transition: 300ms;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:hover {
      border: 1.8px solid #2fd896;
      color: #2fd896;
    }
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }

  h1{
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





export default Garden;
