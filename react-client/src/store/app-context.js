import React from "react";

const AppContext = React.createContext({
  authToken: null,
  isAuthenticated: false,
  userEmail: "",
  user: null,
  hankoDetails: {},
  setUser: () => {},
  handleCompleteUserAuth: () => {},
  handleNewUserAuth: () => {},
  handlePartialUserAuth: () => {},
  handleUpdateHabit: () => {},
  handleDeleteHabit: () => {},
});

export default AppContext;
