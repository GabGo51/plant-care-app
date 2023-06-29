import React from 'react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
const Library = () => {
  const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {

    
    fetch(`/api/get-plants`)
      .then((response) => response.json())
      .then((parse) => {
        setAllPlants(parse.plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(allPlants);

  return (
    <Box>
      <input placeholder='Search'/>
    </Box>
  )
}

const Box = styled.div`
display: flex;
flex-direction: column;

`

export default Library