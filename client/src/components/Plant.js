import React, { useEffect } from "react";
import { styled } from "styled-components";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useState } from "react";
import { keyframes, css } from "styled-components";
import zzz from "../Img/giphy2.gif"

//individual plants in the garden displayed with
//the buttons and batery level displayed
const Plant = ({ plant, garden, setGarden, empty, setEmpty }) => {
  const { user, mode } = useContext(UserContext);
  const [waterTime, setWaterTime] = useState(Date.now()); //initial date
  const [danger, setDanger] = useState(false);
  const [percent, setPercent] = useState(100);

  const percentage = Math.floor(
    ((plant.waterTime - waterTime) / plant.timer) * 100
  );

  //setting danger based on percent
  useEffect(() => {
    if (plant.waterTime - waterTime < 0) {
      setWaterTime(0);
      setPercent(0);
    } else {
      setWaterTime(plant.waterTime - waterTime);
      setPercent(percentage);
    }

    if (percentage < 5) {
      setDanger(true);
    } else {
      setDanger(false);
    }
  }, []);

  //delete function to remove a plant from garden
  const handleDelete = (plantId) => {
    fetch(`/api/delete-plant/${plantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        gardenId: user.gardenId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection
          const updatedGarden = garden.filter(
            (plant) => plant.uniqueId !== plantId
          );
          setGarden(updatedGarden);
          if(garden.length - 1 === 0){
            setEmpty(true)
          }
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //water function to reset the water timer on a specific plant
  const handleWater = (plantId) => {
    fetch(`/api/water-plant/${plantId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        gardenId: user.gardenId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection

          console.log("hello");
          setPercent(100);
          setDanger(false);
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //make first letter each word cap
  const capName = (plantName) => {
    const words = plantName.split(" ");
    const capitalizedWords = words.map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const name = capitalizedWords.join(" ");

    return name;
  };

  return (
    <Box mode={mode}>
      <h3>{capName(plant.name)}</h3>
      <Main danger={danger}>
        {!mode&&<Zzz src={zzz} />}
      
        <i
          className="fa-solid fa-droplet blue"
          onClick={() => handleWater(plant.uniqueId)}
        ></i>
        <PlantImg src={plant.image} />
        <i
          className="fa-regular fa-trash-can red"
          onClick={() => handleDelete(plant.uniqueId)}
        ></i>
      </Main>
      {/* battery level display and changing icon depending on percent */}
      {percent > 80 && (
        <Battery>
          <i className="fa-solid fa-battery-full green"></i>
          <p>{percent}%</p>
        </Battery>
      )}
      {percent < 80 && percent > 50 && (
        <Battery>
          <i className="fa-solid fa-battery-three-quarters green"></i>
          <p>{percent}%</p>
        </Battery>
      )}
      {percent < 50 && percent > 25 && (
        <Battery>
          <i className="fa-solid fa-battery-half yellow"></i>
          <p>{percent}%</p>
        </Battery>
      )}
      {percent < 25 && percent > 5 && (
        <Battery>
          <i className="fa-solid fa-battery-quarter yellow"></i>
          <p>{percent}%</p>
        </Battery>
      )}
      {percent < 5 && (
        <Battery>
          <i className="fa-solid fa-battery-empty red"></i>
          <p>{percent}%</p>
        </Battery>
      )}
    </Box>
  );
};

//animation for danger state

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  
  border-radius: 30px;
  padding: 30px 10px;
  box-shadow: ${({mode}) => mode?"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px":"box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"};
  background-color: ${({mode}) => mode?"white":"#313131  "};
  

  h3 {
    margin-bottom: 20px;
    font-weight: 500;
  }
  p {
    margin-left: 10px;
  }

  i {
    scale: 1.5;
  }

  .green {
    color: #41d673;
  }

  .red {
    color: #ff7676;
  }
  .yellow {
    color: #dee323;
  }

  
  
  
`;

const Battery = styled.div`
  display: flex;
  align-items: center;
  margin-right: -35px;
  margin-top: 10px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  i {
    margin: 0px 30px;
    scale: 1.5;
    transition: 200ms;

    &:hover {
      scale: 1.8;
    }
  }

  .blue {
    color: #40d6e5;
  }

  .red {
    color: #ff7676;
  }
  

  
`;

const Zzz = styled.img`
width:50px;
transform: scaleX(1);
position: absolute;
z-index: 20;
top: 0px;
right: 20px;
`

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

const PlantImg = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: scaleX(-1);
    ${({ danger }) =>
      danger &&
      css`
        animation: ${bounceAnimation} 1s infinite;
      `}
`

export default Plant;
