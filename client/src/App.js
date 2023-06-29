import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from 'styled-components'
import React from "react";
import ActionBar from "./components/ActionBar";
import Collection from "./components/Collection"
import Profile from "./components/Profile";
import Library from "./components/Library";
import PlantDetails from "./components/PlantDetails";

function App() {
  return (
    <Router>
      <Container>
      <ActionBar/>
      <Routes>
        <Route path="/" element={<Collection/>}/>
        <Route path="/user" element={<Profile/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/:plantId" element = {<PlantDetails/>}/>
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
