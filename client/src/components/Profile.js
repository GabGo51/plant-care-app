import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import ActionBar from "./ActionBar";

//Page to display information about the user
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(null);
  const [garden, setGarden] = useState(null);

  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  //fetching garden for length displaying number of plants 
  useEffect(() => {
    user &&
      fetch(`/api/garden/${user.gardenId}`)
        .then((response) => response.json())
        .then((parse) => {
          console.log(parse.data);
          setGarden(parse.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [user]);
  // input state
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  //signout button clearing state and local save
  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("email");
    navigate("/");
  };
  //adding a name to the existing user 
  const handleName = (event, userId) => {
    event.preventDefault();

    fetch(`/api/add-name/${userId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //sending the garden id
      body: JSON.stringify({
        userId: user.gardenId,
        name: name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the collection and reset the garden to that collection

          console.log("hello");
          setUser({ ...user, name: name });
        } else {
          throw new Error("Error deleting plant from collection");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Box>
        <h1>Profile</h1>
        {user && (
          <Info>
            {user.name ? (
              <Name>
                <>{user.name}</>
              </Name>
            ) : (
              <Name onSubmit={handleName}>
                <input onChange={handleChange} />
                <button type="submit">Add Name</button>
              </Name>
            )}

            <div>{user.email}</div>

            <div>
              Number of plants in Garden: <span>{garden}</span>
            </div>
            <div>Joined Plant on: {user.time}</div>
          </Info>
        )}

        <button onClick={handleClick}>Log out</button>
      </Box>
      <ActionBar />
    </>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 500;
    margin-bottom: 200px;
    text-align: center;
    margin-top: 20px;
  }
  span {
    font-weight: 500;
  }

  button {
    font-size: 1.1em;
    margin-top: 50px;
    background-color: white;
    padding: 10px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 150px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;

const Info = styled.div`
  background-color: white;
  width: 85vw;
  padding: 20px;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  line-height: 40px;
`;

const Name = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  button {
    font-size: 0.9em;
    padding: 5px;
    width: 100px;
    margin: 0;
  }
  input {
    outline: none;
    border: none;
    border-radius: 30px;
    width: 50%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    padding-left: 20px;
  }
`;

export default Profile;
