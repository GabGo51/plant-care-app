import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ActionBar = () => {

  const navigate = useNavigate()
  
  return (
    <Container>
      <button onClick={()=>navigate("/")}><i className="fa-solid fa-seedling"></i></button>
      <button onClick={()=>navigate("/user")}><i className="fa-solid fa-user"></i></button>
    </Container>
  )
}


const Container = styled.div`
display: flex;
justify-content: space-between;
position: fixed;
width: 80vw;
bottom: 20px;
z-index: 100;

button{
  background-color: white;
  padding: 20px;
  border: none;
  border-radius: 50%;
  transition: 300ms;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  i{
    scale: 1.5;
  }

  &:hover{
    background-color: black;
    color: white;
  }
}
`
export default ActionBar