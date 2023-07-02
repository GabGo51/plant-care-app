import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
const Login = () => {

    const navigate = useNavigate()

    const handleClick = () =>{

        navigate("/signup")
    }

return(

    <Box>
        <h1>LOGIN</h1>
        <Info>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <button>Login</button>
        </Info>
        
        <p>First time on Plant-Care? - <span onClick={handleClick}>Create an Account</span></p>


    </Box>
)
}

const Box = styled.div`
display:flex;
flex-direction:column;
align-items: center;

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
}

p{
    color: white;
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
    padding:15px 25px;
    border-radius: 30px;
    border: none;
    transition: 200ms;
    width: 100px;

    &:hover{
        background-color: black;
        color: white;
        border: none;
    }


}
`

const Info = styled.div`
display: flex;
flex-direction: column;
margin-top: 200px;
align-items: center;
`

export default Login