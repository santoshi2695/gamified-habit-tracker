import { useContext, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { axiosInstance } from "./lib/axios";

import AppContext from "./store/app-context";
import Loader from "./components/Loader";

const hankoApi = process.env.REACT_APP_HANKO_API_URI;

function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies("hanko");
  const {
    isAuthenticated,
    authToken,
    appLoading,
    setAppLoading,
    handleCompleteUserAuth,
    handlePartialUserAuth,
    handleNewUserAuth,
    handleLogout,
  } = useContext(AppContext);
  const hanko = useMemo(() => new Hanko(hankoApi), []);

  useEffect(() => {
    hanko.onAuthFlowCompleted(async (detail) => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else if (authToken) {
        navigate("/register");
      } else {
        setAppLoading(true);
        const session = hanko.session.get();
        const hankoUser = await hanko.user.getCurrent();
        const token = session.jwt;
        axiosInstance
          .get(`/user/${detail.userID}`)
          .then((res) => {
            const user = res.data.data?.user;
            if (user && user.name && user.avatar) {
              // already registered user
              handleCompleteUserAuth(token, user);
              navigate("/dashboard");
            } else if (user && user.hankoId && user.email) {
              // user was authentiated with hanko before, but profile needs to be completed
              handlePartialUserAuth(token, user);
              navigate("/register");
            } else {
              // new user
              handleNewUserAuth(token, hankoUser.id, hankoUser.email);
            }
            setAppLoading(false);
          })
          .catch((e) => {
            console.log(e);
            toast.error("Something went wrong!");
            setAppLoading(false);
          });
      }
    });
    hanko.onSessionExpired(() => {
      toast("Session Expired. Please Login again.");
      handleLogout();
      navigate("/");
    });
  }, [
    authToken,
    isAuthenticated,
    hanko,
    navigate,
    handleCompleteUserAuth,
    handlePartialUserAuth,
    handleNewUserAuth,
    handleLogout,
  ]);

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log("Something went wrong in Hanko Authentication");
    });

    const setStateBasedOnUser = async () => {
      setAppLoading(true);
      const session = hanko.session.get();
      const hankoUser = await hanko.user.getCurrent();
      const token = session.jwt;
      axiosInstance
        .get(`/user/${hankoUser.id}`)
        .then((res) => {
          console.log(res);
          const user = res.data.data.user;
          if (user && user.name && user.avatar) {
            // already registered user
            handleCompleteUserAuth(token, user);
            setAppLoading(false);
          } else if (user && user.email && user.hankoId) {
            handlePartialUserAuth(token, user);
            setAppLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast("Something went wrong!");
          setAppLoading(false);
        });
    };

    if (cookies && cookies.hanko) {
      setStateBasedOnUser();
    }
  }, [cookies, hanko, handleCompleteUserAuth, handlePartialUserAuth]);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />}></Route>
        {authToken && !isAuthenticated && (
          <Route path="/register" element={<Register />}></Route>
        )}
        {isAuthenticated && (
          <Route path="dashboard" element={<Dashboard hanko={hanko} />} />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
