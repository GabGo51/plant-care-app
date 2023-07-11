import { styled, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import PlantLogo from"../Img/plant.png"

//Creation of a user and posting it on the db
const Signup = () => {
  const { setUser, mode } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  //Tracking the inputs value
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  //Make sure P and CP are the same before posting 
  const handleSignup = () => {
    if (password !== confirmPassword) {
      passwordError()
    } else {
      setPasswordState(false);
    }
  };

  //Posting new User to db 
  const handleSubmit = (event) => {
    if (password !== confirmPassword) {
      event.preventDefault();
    } else {
      event.preventDefault();
      fetch("/api/add-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status === 409){
            emailError()
            throw new Error(data.message);
          }else
          if (
            data.status === 400 ||
            data.status === 500
            
          ) {
            throw new Error(data.message);
          } else {
            setEmailState(false)
            console.log("Added to Database!");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  //removes error after 2 seconds
  const emailError = () =>{
    setEmailState(true)
    setTimeout(()=>{
      setEmailState(false)
    }, 3000)
  }
  const passwordError = () =>{
    setPasswordState(true)
    setTimeout(()=>{
      setPasswordState(false)
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
          type="email"
          placeholder="Email"
          value={email}
          require
        ></input>
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={password}
          minLength={8}
          required
        ></input>
        <input
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          minLength={8}
          required
        ></input>
        <button onClick={handleSignup} type="submit">
          Sign Up
        </button>
      </Info>
      {/* error display for user  */}
      {emailState&&<Error mode = {mode} >Email already used</Error>}
      {passwordState ? (
        <Error mode = {mode}>Password and confirm-password doesnt Match!</Error>
      ) : (
        <></>
      )}

      <p>
        Already have an account? - <span onClick={handleClick}>Login</span>
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

  h1 {
    position: absolute;
    top: 20px;
    font-weight: 500;
  }

  i{

    
    scale: 6;

    transform: translateY(-85%);
  }

  input {
    font-size: 1.1em;
    outline: none;
    border: none;
    margin: 20px;
    width: 300px;
    padding: 10px;
    border-radius: 30px;
    padding-left: 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  p {
    color: balck;
    position: absolute;
    bottom: 60px;
    
    span {
      color: lightblue;
      cursor: pointer;
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
    width: 150px;
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
  padding: 10px 15px;
  margin-top: 40px;
  color: ${({mode}) => mode?"black":"#D6D6D6"};
  text-align: center;
  font-size: 0.9em;
  margin-bottom: 50px;
  animation: ${fadeInOutAnimation} 3s forwards;
  
`;

export default Signup;
