import { useCallback, useState } from "react";
import AppContext from "./app-context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [hankoDetails, setHankoDetails] = useState({
    userId: null,
    email: null,
  });
  const [appLoading, setAppLoading] = useState(false);

  const handleCompleteUserAuth = useCallback((token, user) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    setUser(user);
    setHankoDetails({
      userId: user.hankoId,
      email: user.email,
    });
  }, []);

  const handlePartialUserAuth = useCallback((token, user) => {
    console.log("handlePartialUserAuth called ");
    setAuthToken(token);
    setHankoDetails({
      userId: user.hankoId,
      email: user.email,
    });
  }, []);

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setHankoDetails({ userId: null, email: null });
  }, []);

  const handleAddHabit = (habit) => {
    const newUser = { ...user };
    newUser.habits.push(habit);
    setUser(newUser);
  };

  const handleUpdateHabit = (index, habit) => {
    const newUser = { ...user };
    newUser.habits[index] = habit;
    setUser(newUser);
  };

  const handleDeleteHabit = (index) => {
    const newUser = { ...user };
    newUser.habits = newUser.habits.filter((hab, i) => i !== index);
    setUser(newUser);
  };

  const handleNewUserAuth = useCallback(
    (token, hankoId, email) => {
      setAuthToken(token);
      setHankoDetails({
        userId: hankoId,
        email,
      });
      axiosInstance
        .post(`/user/`, {
          hankoId,
          email,
        })
        .then(() => {
          navigate("/register");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something went Wrong");
        });
    },
    [navigate]
  );

  const handleRegisterComplete = (name, avatar) => {
    setAppLoading(true);
    axiosInstance
      .put(`/user/${hankoDetails.userId}`, {
        name,
        hankoId: hankoDetails.userId,
        email: hankoDetails.email,
        avatar,
      })
      .then((res) => {
        const user = res.data.data.user;
        setIsAuthenticated(true);
        setUser(user);
        navigate("/dashboard");
        setAppLoading(false);
      })
      .catch(() => {
        setAppLoading(false);
        toast.error("Something went wrong");
      });
  };

  // const startAppLoading = useCallback(() => {
  //   setAppLoading(true);
  // }, [setAppLoading]);

  const appContext = {
    isAuthenticated,
    authToken,
    hankoDetails,
    user,
    setUser,
    appLoading,
    setAppLoading,
    handleCompleteUserAuth,
    handleNewUserAuth,
    handlePartialUserAuth,
    handleRegisterComplete,
    handleLogout,
    handleAddHabit,
    handleUpdateHabit,
    handleDeleteHabit,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
