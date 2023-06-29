import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ActionBar = () => {

  const navigate = useNavigate()
  
  return (
    <Container>
      <button onClick={()=>navigate("/")}>PLANT</button>
      <button onClick={()=>navigate("/user")}>PROFILE</button>
    </Container>
  )
}


const Container = styled.div`
display: flex;
justify-content: space-between;
position: fixed;
width: 80vw;
bottom: 0;
`
export default ActionBar