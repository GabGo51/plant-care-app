import React, { useEffect } from "react";
import { styled } from "styled-components";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useState } from "react";
import { keyframes, css } from 'styled-components';


const Plant = ({plant, garden ,setGarden}) => {

  const { user } = useContext(UserContext);
  const [waterTime, setWaterTime] = useState(Date.now())
  const [danger, setDanger] = useState(false)
  const [percent, setPercent] = useState()
  

  useEffect(() => {

    if (plant.timer - waterTime < 3600000){
    setDanger(true)
    }

    if (plant.timer - waterTime < 0){
      setWaterTime(0)
      setPercent(0)
    }else {
      setWaterTime(plant.timer - waterTime)
      setPercent(Math.floor((plant.timer-waterTime)/plant.timer*100))
    }
    
  }, [setPercent]);
  
   
  console.log(percent);

  const handleDelete = (plantId) => {
    fetch(`/api/delete-plant/${plantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        gardenId:user.gardenId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection
          const updatedGarden = garden.filter(
            (plant) => plant.uniqueId !== plantId
          );
          setGarden(updatedGarden);
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box>
      <p>{plant.name}</p>
      <Main danger = {danger}>
        <i className="fa-solid fa-droplet blue"></i>
        <img  src={plant.image} />
        <i
          className="fa-regular fa-trash-can red"
          onClick={() => handleDelete(plant.uniqueId)}
        ></i>
      </Main>
      <p>{waterTime}</p>
      {percent>75&& 
      <>
        <i className="fa-solid fa-battery-full"></i>
        <>{percent}%</>
      </>
      }
      {percent<2 && 
      <>
        <i className="fa-solid fa-battery-empty"></i>
        <>{percent}%</>
      </>
      }
    </Box>
  );
};

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(70%) sepia(100%) saturate(200%) hue-rotate(-30deg);
  }
  100% {
    transform: scale(1);
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  p{
    margin: 10px 20px;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;

  
  i {
    margin: 0px 30px;
    scale: 1.5;
    transition: 200ms;

    &:hover {
      scale: 1.65;
    }
  }

  .blue {
    color: #40d6e5;
  }

  .red {
    color: #ff7676;
  }

  img {
    ${({ danger }) =>
      danger &&
      css`
        animation: ${bounceAnimation} 1s infinite;
      `}
  }
`;

export default Plant;
