import { createContext } from "react";

import { useState } from "react";
// we made all of this so we can still get the information from the backend upon refreshing the page
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
