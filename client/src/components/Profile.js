import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
const Profile = () => {

  const navigate = useNavigate()

  const handleClick = () =>{

    navigate("/login")
  }
  return (
    <Box>
      <h1>Profile</h1>
      <div>user name</div>
      <div>user email</div>
      <div>bio</div>
      <div>number of plants in collection</div>
      <div>subscribed on what date </div>
      <button onClick={handleClick}>Log out</button>
    </Box>
  )
}

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;

button{
    font-size: 1.1em;
    margin-top: 50px;
    background-color: white;
    padding:10px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 150px;

    &:hover{
        background-color: black;
        color: white;
        border: none;
    }
}
`


export default Profile