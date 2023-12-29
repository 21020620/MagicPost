import { createContext, useState, useEffect } from "react";

// Create a context
const AppContext = createContext();

// Create a provider component to wrap the application and manage the state
const AppContextProvider = ({ children }) => {
  // State to manage user data
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  // useEffect to update local storage whenever the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Provide the context value to the components
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Export the context and provider
export default AppContext;
export { AppContextProvider };
