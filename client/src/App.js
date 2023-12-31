import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import React from "react";
import ActionBar from "./components/ActionBar";
import Garden from "./components/Garden";
import Profile from "./components/Profile";
import Library from "./components/Library";
import PlantDetails from "./components/PlantDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GlobalStyles from "./GlobalStyles";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";

//all Paths
function App() {
  const { mode, setMode } = useContext(UserContext);
  
  return (
    <Router>
      <GlobalStyles mode = {mode} />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/garden/:gardenId" element={<Garden />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/plant/:plantId" element={<PlantDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
