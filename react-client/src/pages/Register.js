import React, { useContext, useEffect, useState, useRef } from "react";

import classes from "./pages.module.css";
import AppContext from "../store/app-context";
import cx from "classnames";

import { getRegisterAvatars } from "../lib/avatar";
import { toast } from "react-toastify";

const Register = () => {
  const { hankoDetails, handleRegisterComplete } = useContext(AppContext);
  const [avatars, setAvatars] = useState([]);
  const nameRef = useRef();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    setAvatars(getRegisterAvatars(hankoDetails.email));
  }, [hankoDetails.email]);

  const handleAvatarClick = (index) => {
    setSelectedAvatar(avatars[index]);
  };

  const handleStartClick = () => {
    const name = nameRef.current.value;
    if (name.trim().length === 0) {
      toast.error("Please enter your name");
      return;
    }
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }
    handleRegisterComplete(name, selectedAvatar);
  };

  return (
    <div className="bg-blue-50 w-screen h-screen">
      <div className="flex h-full container mx-auto">
        <div className=" w-3/4 h-full flex flex-col justify-center text-center items-center">
          <div className="relative w-1/2 flex flex-col items-center">
            <div className="text-3xl font-bold relative">
              What should we call you?
            </div>
            <div className="mt-5 w-full">
              <input
                ref={nameRef}
                className={classes.nameInput}
                type="text"
                placeholder="John Doe"
              ></input>
              <span className={classes["focus-border"]}></span>
            </div>
          </div>
          <div className="mt-8 w-[90%] relative">
            <div className="text-3xl font-bold relative">
              Select Your Avatar
            </div>
            <div className="mt-3 flex flex-wrap w-full justify-center">
              {avatars.map((av, index) => (
                <div
                  key={index}
                  onClick={() => handleAvatarClick(index)}
                  className={cx(classes.avatarContainer, "m-5 w-[22%]", {
                    [classes.active]: selectedAvatar === av,
                  })}
                >
                  <figure>
                    <img src={av} className="block w-full" alt="avatar" />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/12 ml-10 flex flex-col justify-center">
          <button className={classes.bigBtn} onClick={handleStartClick}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
