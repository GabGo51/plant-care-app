import { createContext, useEffect } from "react";

import { useState } from "react";

//Context to keep track of the user logged in 
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode ,setMode] = useState(true)
  console.log(user);
  useEffect(()=>{

    let email = localStorage.getItem("email")
    console.log(email);
   

      if(email){
      fetch("https://plant-care-app.onrender.com/api/signinemail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase() //make sure its not case sensitiv for email 
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500 || data.status === 409) {
          throw new Error(data.message);
        } else {
          console.log("User Found!");
          setUser(data.user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },[])

  return (
    <UserContext.Provider value={{ user, setUser, mode, setMode }}>
      {children}
    </UserContext.Provider>
  );
};
