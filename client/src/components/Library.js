import React from 'react'
import { styled } from 'styled-components'
import { useEffect } from 'react'
const Library = () => {
  useEffect(()=>{


  }, [])

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