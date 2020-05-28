import React from "react";
import { getCurrentUser } from "../userService";

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    if (currentUser || !localStorage.getItem("userToken")) return;
    getCurrentUser().then(setCurrentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
