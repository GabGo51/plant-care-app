import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'
const Collection = () => {
  const [collection, setCollection] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/api/collection`)
      .then((response) => response.json())
      .then((parse) => {
        setCollection(parse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(collection);

  return (
    <Box>
      <h1>Collection</h1>
      {collection&&
      <Content>
      {collection.map(plant =>{
        return(
          <Plant>
            <p>{plant.name}</p>
            <Main>
              <i className="fa-solid fa-droplet blue"></i>
              <img src={plant.image}/>
              <i className="fa-regular fa-trash-can red"></i>
            </Main>
            <p>timer</p>
            
          </Plant>
        )
      })}
      
      </Content>
      
      }
      
      <button onClick={()=>navigate("/library")}>+</button>
    </Box>
    
  )
}

const Box = styled.div`
display: flex;
position: relative;
flex-direction: column;
align-items: center;
height: 100vh;

button{
width: 50px;
height: 50px;
border-radius: 50%;
font-size: 2em;
position: fixed;
bottom: 50px;
background-color: black;
color: white;
font-weight: bold;
border: 2px solid black;
transition: 300ms;
&:hover{
  background-color: white;
  color: black;
  border: none;
}
}

img{
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
`

const Content = styled.section`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;

`

const Plant = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: 20px;
`

const Main = styled.div`
display: flex;
align-items: center;
i{
  margin: 0px 30px;
  scale: 1.5;
}

.blue{
  color: #40D6E5  ;
}

.red{
  color: #FF7676 ;
}

`



export default Collection