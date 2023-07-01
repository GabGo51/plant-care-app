import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PlantDetails = () => {

  const params = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch(`/api/get-items`)
      .then((response) => response.json())
      .then((parse) => {
        setPlant(parse.items.slice(98,104)); 
        console.log(items);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <div>PlantDetails</div>
  )
}

export default PlantDetails