import React from "react";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionBar from "./ActionBar";
import { UserContext } from "./UserContext";
import { useContext } from "react";
//Display of an Autofill SearchBar that gives you the link to different plants
const Library = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const{mode} = useContext(UserContext)

  // Get matching plants from the SB value and the database
  const matchedPlants = allPlants.filter((plant) => {
    if (value.length < 2) {
      return false;
    }
    return plant.common_name.toLowerCase().includes(value.toLowerCase());
  });
  //Limit to not overflow the page with suggestion
  const limit = matchedPlants.slice(0, 9);

  //Fetching all the plants from the db
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-plants`)
      .then((response) => response.json())
      .then((parse) => {
        setAllPlants(parse.plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //input state
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box mode = {mode}>
        <InputBox mode = {mode}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            value={value}
            placeholder=""
            type="text"
            onChange={handleChange}
          />
        </InputBox>
        <p mode = {mode}>
          Search for<span>your plant </span>
          <span>
            <i class="fa-solid fa-leaf"></i>{" "}
          </span>
        </p>

        <List mode = {mode}>
          {/* mapping over limit and not all suggestion */}
          {limit.map((plant) => {
            const index = plant.common_name
              .toLowerCase()
              .indexOf(value.toLowerCase());
            // Splitting result in half for bold effect
            const firstHalf = plant.common_name.slice(0, index + value.length);
            const secondHalf = plant.common_name.slice(index + value.length);
            const handleClick = () => {
              navigate(`/plant/${plant.id}`);
              setValue("");
            };
            return (
              <ListItem mode = {mode} key={plant.id} onClick={handleClick}>
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf}</Prediction>
                </span>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <ActionBar />
    </>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  width: 100%;
  position: relative;
  

  input {
    margin-top: 20px;
    padding: 12px;
    padding-left: 80px;
    border-radius: 30px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 1.4em;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: ${({mode}) => mode?"white":"#EDEDED"};
    

    
  }

  p {
    position: absolute;
    top: 200px;
    display: flex;
    flex-direction: column;
    font-size: 2em;
    opacity: 0.5;
    color: ${({mode}) => mode?"black":"#E8E8E8"};
    text-align: center;

    span {
      color: ${({mode}) => mode?"black":"#E8E8E8"};
    }
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 80%;

  i {
    position: absolute;
    bottom: 20px;
    left: 30px;
    scale: 1.5;
    color: black;

  }
`;

const List = styled.ul`
  width: 80%;
  margin-top: 30px;
  z-index: 20;
`;

const ListItem = styled.li`
  cursor: pointer;
  background-color: ${({mode}) => mode?"white":"#121212"};

  border: 1px solid grey;
  padding: 20px;
  transition: 200ms;

  &:hover {
    
    background-color: ${({mode}) => mode?"#F1F1F1  ":"#373737"};
    
      transform: translateX(0.5%);
    
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default Library;
