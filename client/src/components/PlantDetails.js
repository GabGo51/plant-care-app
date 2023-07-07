import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import ActionBar from "./ActionBar";
//Page that displays information about a plant, also where you can Add it to your collection
const PlantDetails = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  // fetching the plant details
  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(`/api/plant/${params.plantId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plant data");
        }
        const plantData = await response.json();
        
        setPlant(plantData.plant);
      } catch (error) {
        console.error(error);
        // Handle error state or display an error message
      }
    };
    fetchPlantData();
  }, [params.plantId]);

  
  //Adding a plant to your collection
  const handleClick = () => {
    
    fetch("/api/add-plant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: plant.id,
        uniqueId: Math.floor(Math.random()*100000),
        name: plant.common_name,
        water: plant.watering,
        image: plant.default_image.original_url,
        gardenId:user.gardenId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          console.log("Added to collection!");
          navigate(`/garden/${user.gardenId}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {plant && (
        <Box>
          <h2>
            {plant.common_name.charAt(0).toUpperCase() +
              plant.common_name.slice(1)}
          </h2>
          <img src={plant.default_image.original_url} />
          <p>{plant.scientific_name}</p>
          <InfoBox>
            <p>Cycle</p>
            <Cycle>{plant.cycle}</Cycle>
            <p>Watering</p>
            <Watering>{plant.watering}</Watering>
            <p>Light</p>
            <Sunlight>
              {plant.sunlight[0].charAt(0).toUpperCase() +
                plant.sunlight[0].slice(1)}
            </Sunlight>
          </InfoBox>
          <button onClick={handleClick}>Add to Garden</button>
        </Box>
      )}
      <ActionBar />
    </>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  h2 {
    color: black;
    margin: 20px 0px;
  }
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
  }

  p {
    color: black;
    margin: 20px;
    font-style: italic;
  }

  button{
    background-color: transparent;
    cursor: pointer;
    color: black;
    border: 2px solid black;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 30px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    border-radius: 40px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin: 5px;
  }
`;

const Cycle = styled.div`
  padding: 20px;
  border: 2px solid #15f19e;
  color: #15f19e;
  font-weight: bold;
`;
const Watering = styled.div`
  padding: 20px;
  border: 2px solid #15c5f1;
  color: #15c5f1;
  font-weight: bold;
`;
const Sunlight = styled.div`
  padding: 20px;
  border: 2px solid #f1dd15;
  color: #f1dd15;
  font-weight: bold;
`;

export default PlantDetails;
