import React from "react";
import { styled } from "styled-components";
import { UserContext } from "./UserContext";
import { useContext } from "react";
const Plant = ({plant, garden ,setGarden}) => {

  const { user } = useContext(UserContext);

  const handleDelete = (plantId) => {
    fetch(`/api/delete-plant/${plantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        gardenId:user.gardenId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection
          const updatedGarden = garden.filter(
            (plant) => plant.uniqueId !== plantId
          );
          setGarden(updatedGarden);
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box key={plant._id}>
      <p>{plant.name}</p>
      <Main>
        <i className="fa-solid fa-droplet blue"></i>
        <img src={plant.image} />
        <i
          className="fa-regular fa-trash-can red"
          onClick={() => handleDelete(plant.uniqueId)}
        ></i>
      </Main>
      <p>{plant.timer}</p>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  i {
    margin: 0px 30px;
    scale: 1.5;
    transition: 200ms;

    &:hover {
      scale: 1.65;
    }
  }

  .blue {
    color: #40d6e5;
  }

  .red {
    color: #ff7676;
  }
`;

export default Plant;
