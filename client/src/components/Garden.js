import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Garden = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const params = useParams()
  console.log(params);

  const [collection, setCollection] = useState(null);
  console.log(collection);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/garden/${params.gardenId}`)
      .then((response) => response.json())
      .then((parse) => {
        console.log(parse);
        setCollection(parse.data);
        // console.log(parse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCollection]);

  const handleDelete = (plantId) => {
    // Perform delete request to remove a single item from the cart
    fetch(`/api/delete-plant/${plantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gardenId:user.gardenId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the cartItems state to reflect the deletion
          const updatedCollection = collection.filter(
            (plant) => plant.uniqueId !== plantId
          );
          setCollection(updatedCollection);
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <h1>Garden</h1>
      {collection && (
        <Content>
          {collection.map((plant) => {
            console.log(plant);
            return (
              <Plant key={plant._id}>
                <p>{plant.name}</p>
                <Main>
                  <i className="fa-solid fa-droplet blue"></i>
                  <img src={plant.image} />
                  <i
                    className="fa-regular fa-trash-can red"
                    onClick={() => handleDelete(plant.uniqueId)}
                  ></i>
                </Main>
                <p>timer</p>
              </Plant>
            );
          })}
        </Content>
      )}

      <button onClick={() => navigate("/library")}>+</button>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 2em;
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
    border: 2px solid black;
    transition: 300ms;
    &:hover {
      background-color: white;
      color: black;
      border: none;
    }
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Content = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Plant = styled.div`
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

export default Garden;
