import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from 'styled-components'
import React from "react";
import ActionBar from "./components/ActionBar";
import Collection from "./components/Collection"
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Container>
      <ActionBar/>
      <Routes>
        <Route path="/" element={<Collection/>}/>
        <Route path="/user" element={<Profile/>}/>
      </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export default App;
