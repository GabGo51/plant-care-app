import React from 'react'
import { styled } from 'styled-components'

const Profile = () => {
  return (
    <Box>
      <h1>Profile</h1>
      <div>user name</div>
      <div>user email</div>
      <div>bio</div>
      <div>number of plants in collection</div>
      <div>subscribed on what date </div>
      <div>log out</div>
    </Box>
  )
}

const Box = styled.div`
display: flex;
flex-direction: column;
`

export default Profile