import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const Collection = () => {

  const navigate = useNavigate()

  return (
    <Box>
      <h1>Collection</h1>
      <>
      Content
      </>
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
}
`

export default Collection