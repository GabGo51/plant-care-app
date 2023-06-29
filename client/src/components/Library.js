import React from 'react'
import { styled } from 'styled-components'

const Library = () => {
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