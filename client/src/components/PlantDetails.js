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
          setPlant(plantData.data);
        } catch (error) {
          console.error(error);
          // Handle error state or display an error message
        }
      };
  
      fetchPlantData();
  
      
    }, [params.plantId]);

  console.log(plant);
  
  return (
    <div>PlantDetails</div>
  )
}

export default PlantDetails