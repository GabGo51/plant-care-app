import { styled, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import PlantLogo from"../Img/plant.png"

//Login page for user to enter info
const Login = () => {
  const { setUser, mode } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //Tracking inputs value
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  //Comparing Input values to data base to see if user exists
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(), //make sure its not case sensitiv for email
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500 || data.status === 409) {
          errorLogin();
          throw new Error(data.message);
        } else {
          setUser(data.user);
          window.localStorage.setItem("email", data.user.email);
          setError(false);
          console.log("User Found!");
          navigate(`/Garden/${data.user.gardenId}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const errorLogin = () =>{
    setError(true)
    setTimeout(()=>{
      setError(false)
    }, 3000)
  }

  return (
    <Box mode = {mode}>
      <h1>BLOOM</h1>

      <PlantImage mode = {mode} src={PlantLogo}/>
      <Info onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          required
          value={email}
          type="email"
          placeholder="Email"
        ></input>
        <input
          name="password"
          onChange={handleChange}
          required
          value={password}
          type="password"
          placeholder="Password"
        ></input>
        <button type="submit">Login</button>
      </Info>
      {error ? <Error mode = {mode}>Invalid Email or Password</Error> : <></>}

      <p>
        First time on Plant-Care? -{" "}
        <span onClick={handleClick}>Create an Account</span>
      </p>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  padding-top: 20px;
  h1 {
    position: absolute;
    top: 45px;
    font-weight: 500;
  }

  i {
    transform: translateY(-200%);
    scale: 6;

    @media screen and (max-width: 400px) {
      transform: translateY(-100%);
    }
  }

  input {
    font-size: 1.1em;
    outline: none;
    border: none;
    margin: 20px;
    width: 320px;
    padding: 10px;
    border-radius: 30px;
    padding-left: 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  p {
    
    position: absolute;
    bottom: 60px;
    width: 370px;
    span {
      color: lightblue;
      cursor: pointer;
    }

    @media screen and (max-width: 400px) {
      width: 250px;
      text-align: center;
    }
  }

  button {
    font-size: 1.1em;
    margin-top: 50px;
    background-color: white;
    padding: 10px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 100px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;
const PlantImage = styled.img`
width: 200px;
  margin-top: 50px;
  filter: ${({mode}) => mode ? "brightness(100%)" : "invert(90%)"};
  transform: translateY(-30%);
  object-fit: cover;
`

const Info = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const fadeInOutAnimation = keyframes`
  0% { opacity: 0; }
  30% { opacity: 1; }
  80%{opacity:1;}
  100% { opacity: 0; }
`;

const Error = styled.div`
  background-color: ${({mode}) => mode?"lightpink":"transparent"};
  padding: 10px 30px;
  margin-top: 40px;
  animation: ${fadeInOutAnimation} 3s forwards;
  color: ${({mode}) => mode?"black":"#D6D6D6"};
`;

export default Login;
