import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PlantDetails = () => {

  const params = useParams();
  const [plant, setPlant] = useState(null);

    // fetching the product details and the company details
    useEffect(() => {
      const fetchPlantData = async () => {
        try {
          const response = await fetch(`/api/plant/${params.plantId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch plant data");
          }
          const plantData = await response.json();
          console.log(plantData);
          setPlant(plantData.plant);
        } catch (error) {
          console.error(error);
          // Handle error state or display an error message
        }
      };
  
      fetchPlantData();
  
      
    }, [params.plantId]);

  console.log(plant);
  //
  return (

    <>
    {plant&&
      <Box>
        <h2>{plant.common_name}</h2>
        <img src={plant.default_image.original_url}/>
        <p>{plant.scientific_name}</p>
        <InfoBox>
          <Cycle>{plant.cycle}</Cycle>
          <Watering>{plant.watering}</Watering>
          <Sunlight>{plant.sunlight[0]}</Sunlight>
        </InfoBox>
      </Box>
      
    }
      
    </>
    
  )
}

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
h2{
  color: black;
  margin: 20px 0px;
}
img{
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
}

p{
  color: black;
  margin: 20px;
  font-style: italic;
}
`

const InfoBox = styled.div`
display: flex;

div{
  border-radius: 40px;
  margin: 20px;
}
`

const Cycle = styled.div`
padding: 20px;
border: 2px solid #15F19E ;
color: #15F19E;
font-weight:bold;
`
const Watering = styled.div`
padding: 20px;
border: 2px solid #15C5F1 ;
color: #15C5F1 ;
font-weight:bold;
`
const Sunlight = styled.div`
padding: 20px;
border: 2px solid #F1DD15 ;
color: #F1DD15 ;
font-weight:bold;
`

export default PlantDetails