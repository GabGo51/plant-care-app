import React from "react";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionBar from "./ActionBar";
//Display of an Autofill SearchBar that gives you the link to different plants
const Library = () => {
  const [allPlants, setAllPlants] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

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
    fetch(`/api/get-plants`)
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
      <Box>
        <InputBox>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            value={value}
            placeholder=""
            type="text"
            onChange={handleChange}
          />
        </InputBox>
        <p>
          Search for<span>your plant </span>
          <span>
            <i class="fa-solid fa-leaf"></i>{" "}
          </span>
        </p>

        <List>
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
              <ListItem key={plant.id} onClick={handleClick}>
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
  padding-bottom: 200px;

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
  }

  p {
    position: absolute;
    top: 200px;
    display: flex;
    flex-direction: column;
    font-size: 2em;
    opacity: 0.5;
    color: black;
    text-align: center;

    span {
      color: black;
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
  }
`;

const List = styled.ul`
  width: 80%;
  margin-top: 30px;
  z-index: 20;
`;

const ListItem = styled.li`
  cursor: pointer;
  background-color: white;
  border: 1px solid grey;
  padding: 20px;
  transition: 200ms;

  &:hover {
    background-color: #dddddd;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default Library;
