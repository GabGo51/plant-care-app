import React from 'react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Library = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const matchedPlants = allPlants.filter((plant) => {
    if (value.length < 2) {
      return false;
    }
    return plant.common_name.toLowerCase().includes(value.toLowerCase());
  });
  const limit = matchedPlants.slice(0, 9);
  


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
      <p>Search for<span>your plant :)</span> </p>
      
      <List>
        {limit.map(plant=>{
          const index = plant.common_name
          .toLowerCase()
          .indexOf(value.toLowerCase());
          const firstHalf = plant.common_name.slice(0, index + value.length);
          const secondHalf = plant.common_name.slice(index + value.length);
          const handleClick = () => {
            navigate(`/plant/${plant.id}`);
            setValue("");
          };
          return (
            <ListItem key={plant.id} onClick={handleClick} >
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
position: relative;

input{
  margin-top: 20px;
  padding: 12px;
  padding-left: 80px;
  border-radius: 30px;
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.4em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

p{
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: column;
  font-size: 2em;
  opacity: 0.5;
  color: white;

  span{

  }
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