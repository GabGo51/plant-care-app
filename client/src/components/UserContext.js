import { createContext, useEffect } from "react";

import { useState } from "react";

//Context to keep track of the user logged in 
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(getInitialMode);

  // Function to get the initial mode from localStorage or return true (default mode)
  function getInitialMode() {
    const savedMode = localStorage.getItem("mode");
    return savedMode === "true";
  }

  // Function to save the mode state to localStorage
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  console.log(user);
  useEffect(()=>{

    let email = localStorage.getItem("email")
    console.log(email);
   

      if(email){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signinemail`, {
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
