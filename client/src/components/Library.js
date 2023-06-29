import React from 'react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
const Library = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [value, setValue] = useState("")

  const matchedPlants = allPlants.filter((plant) => {
    if (value.length < 2) {
      return false;
    }
    return plant.common_name.toLowerCase().includes(value.toLowerCase());
  });
  const limit = matchedPlants.slice(0, 10);
  


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

  console.log(matchedPlants);

  const handleChange = (event) =>{
    setValue(event.target.value)

  }

  return (
    <Box>
      <InputBox>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          value={value}
          placeholder='Search'
          type='text'
          onChange={handleChange}
        />
      </InputBox>
      <List>
        {limit.map(plant=>{
          const index = plant.common_name
          .toLowerCase()
          .indexOf(value.toLowerCase());
          const firstHalf = plant.common_name.slice(0, index + value.length);
          const secondHalf = plant.common_name.slice(index + value.length);

          return (
            <ListItem key={plant._id} >
              <span>
                {firstHalf}
                <Prediction>{secondHalf}</Prediction>
              </span>
            </ListItem>
          );

        })}

      </List>
      
    </Box>
  )
}

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 100px;
width: 100%;

input{
  margin-top: 20px;
  padding: 12px;
  padding-left: 80px;
  border-radius: 30px;
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.4em;
}

`

const InputBox = styled.div`
position: relative;
width: 80%;

i{

  position: absolute;
  bottom: 17px;
  left: 30px;
  scale: 1.5;
}
`

const List = styled.ul`
width: 80%;
margin-top: 30px;

`

const ListItem = styled.li`
background-color: white;
border: 1px solid grey;
padding: 20px;
transition: 200ms;

&:hover {

  background-color:  #DDDDDD;
}
`

const Prediction = styled.span`
font-weight: bold;
`

export default Library