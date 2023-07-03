import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const PlantDetails = () => {

  const params = useParams();
  const [plant, setPlant] = useState(null);
  const navigate  = useNavigate()

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
  
  
  
  

  const handleClick = () =>{
    console.log(plant.common_name, plant.watering);
      fetch("/api/add-plant", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: plant.id,
          name:plant.common_name,
          water: plant.watering,
          image: plant.default_image.original_url,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 400 || data.status === 500) {
            
  
            throw new Error(data.message);
          } else {
            console.log("Added to collection!");
            navigate("/")
          }
        })
        .catch((error) => {
          console.error(error);
          
        });
        
  }
  return (

    <>
    {plant&& 
      <Box>
        <h2>{plant.common_name.charAt(0).toUpperCase() +  plant.common_name.slice(1)}</h2>
        <img src={plant.default_image.original_url}/>
        <p>{plant.scientific_name}</p>
        <InfoBox>
          <p>Cycle</p>
          <Cycle>{plant.cycle}</Cycle>
          <p>Watering</p>
          <Watering>{plant.watering}</Watering>
          <p>Light</p>
          <Sunlight>{plant.sunlight[0].charAt(0).toUpperCase() + plant.sunlight[0].slice(1)}</Sunlight>
        </InfoBox>
        <button onClick={handleClick}>Add to Collection</button>
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
flex-direction: column;
align-items: center;

div{
  border-radius: 40px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

p{
  margin: 5px;
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