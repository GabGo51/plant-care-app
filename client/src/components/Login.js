import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)

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

    const navigate = useNavigate()

    const handleClick = () =>{

        navigate("/signup")
    }

    const handleSubmit = (event) =>{
        event.preventDefault()

        fetch(`/api/get-user`)
      .then((response) => response.json())
      .then((parse) => {
        setUser(parse.data);
        console.log(parse.data);
        setError(false)
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
        setError(true)
      });

    }

return(

    <Box>
        <h1>LOGIN</h1>
        <Info onSubmit={handleSubmit}>
            <input name="email" onChange={handleChange} required value={email} type="email" placeholder="Email"></input>
            <input name="password" onChange={handleChange}  required value={password} type="password" placeholder="Password"></input>
            <button type="submt">Login</button>
        </Info>
        {error? <>Invalid Email or Password</>:<></>}
        
        <p>First time on Plant-Care? - <span onClick={handleClick}>Create an Account</span></p>


    </Box>
)
}

const Box = styled.div`
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
position: relative;
height: 100vh;

h1{
    position: absolute;
    top: 20px;
}

input{
    font-size: 1.1em;
    outline: none;
    border: none;
    margin: 20px;
    width: 300px;
    padding: 10px;
    border-radius: 20px;
    padding-left: 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

p{
    color: black;
    position: absolute;
    bottom: 125px;
    span{
        color: lightblue;
        cursor: pointer;
        
    }
}

button{
    font-size: 1.1em;
    margin-top: 50px;
    background-color: white;
    padding:10px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 100px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover{
        background-color: black;
        color: white;
        border: none;
    }


}
`

const Info = styled.form`
display: flex;
flex-direction: column;

align-items: center;
`

export default Login