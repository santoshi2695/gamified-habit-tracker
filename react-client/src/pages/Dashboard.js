import React, { useState, useContext } from "react";
import AppContext from "../store/app-context";

import { FaPlusCircle, FaMinusCircle, FaHeart, FaPlus } from "react-icons/fa";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { AiFillBackward, AiOutlineForward } from "react-icons/ai";
import HabitModal from "../components/HabitModal";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import classes from "./pages.module.css";
import cx from "classnames";

const HabitCounterChangeMsg = ({ habit }) => {
  if (habit.type === 1) {
    return (
      <div className="flex items-center">
        <div className="flex items-center">
          +{habit.difficulty * 5}{" "}
          <BsFillSuitDiamondFill className="text-yellow-500" />
        </div>
        <div className="ml-5">Good job!</div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        -4
        <FaHeart className="text-red-500 ml-2" />
      </div>
    );
  }
};

const Dashboard = ({ hanko }) => {
  const { user, setUser, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const [habitModalOpen, setHabitModalOpen] = useState(false);
  const [habitModalState, setHabitModalState] = useState(null);

  const openHabitModal = () => {
    setHabitModalOpen(true);
  };

  const closeHabitModal = () => {
    setHabitModalOpen(false);
  };

  const habitClickHandler = (index) => {
    const clickedHabit = user.habits[index];
    setHabitModalState({
      id: clickedHabit._id,
      index: index,
      title: clickedHabit.title,
      type: clickedHabit.type,
      difficulty: clickedHabit.difficulty,
      resetCounterType: clickedHabit.resetCounterType,
    });
    openHabitModal();
  };

  const habitCounterChangeHandler = (index) => {
    const clickedHabit = { ...user.habits[index] };
    axiosInstance.put(`/user/habit/${clickedHabit._id}`).then((response) => {
      const updatedUser = response.data.data.user;
      toast(<HabitCounterChangeMsg habit={clickedHabit} />);
      setUser(updatedUser);
    });
  };

  const logoutClickHandler = async () => {
    await hanko.user.logout();
    handleLogout();
    navigate("/");
    toast("Logged out");
  };

  return (
    <>
      {habitModalOpen && (
        <HabitModal
          habitModalState={habitModalState}
          modalIsOpen={habitModalOpen}
          onClose={closeHabitModal}
        />
      )}

      <div className="w-screen h-screen bg-blue-50">
        <div className="container h-full mx-auto flex items-center">
          <div className="w-1/2 h-full flex flex-col justify-center px-10">
            <div className="w-full flex">
              <div className="relative">
                <img
                  src={user.avatar}
                  className="h-[26rem] block"
                  alt="Avatar"
                ></img>
                <div className="flex absolute left-0 -bottom-[3rem] font-medium text-2xl">
                  {user.name}
                </div>
                <div className="flex absolute right-0 -bottom-[3rem] text-gray-500 font-medium text-2xl">
                  Level {user.level}
                </div>
              </div>
              <div className="h-[26rem] w-4 relative border-2 border-yellow-500 rounded-xl ml-10 mr-6 flex flex-col-reverse">
                <div
                  style={{
                    transition: "height 0.3s ease-out",
                    height: `${user.points}%`,
                  }}
                  className="w-full bg-yellow-500 rounded-xl"
                ></div>
                <div className="absolute w-full flex items-center justify-center -bottom-7 text-yellow-500">
                  <BsFillSuitDiamondFill />
                </div>
                <div className="absolute w-full flex items-center justify-center -top-7 text-gray-500">
                  {user.points}
                </div>
              </div>
              <div className="h-[26rem] w-4 relative border-2 border-red-500 rounded-xl flex flex-col-reverse">
                <div
                  style={{
                    transition: "height 0.3s ease-out",
                    height: `${user.health}%`,
                  }}
                  className={`w-full bg-red-500 rounded-xl`}
                ></div>
                <div className="absolute w-full flex items-center justify-center -bottom-7 text-red-500">
                  <FaHeart />
                </div>
                <div className="absolute w-full flex items-center justify-center -top-7 text-gray-500">
                  {user.health}
                </div>
              </div>
            </div>
            <div className="mt-24 text-center -mr-2">
              <button
                className={cx(classes.bigBtn, "flex")}
                onClick={logoutClickHandler}
              >
                <div>Log out</div>
              </button>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center">
            <div className="h-5/6 bg-white px-10 py-8 overflow-y-auto">
              <div className="flex justify-between items-center font-medium">
                <div className="text-[1.7rem]">Habits</div>
                <div
                  onClick={() => {
                    setHabitModalState(null);
                    openHabitModal();
                  }}
                  className="text-xl bg-blue-500 flex justify-center items-center text-white py-2 px-5 hover:bg-blue-800 transition duration-200 cursor-pointer"
                >
                  <span className="mr-3">Add</span>
                  <FaPlus className="text-white" />
                </div>
              </div>
              <div className="mt-10 text-xl">
                {user.habits?.length > 0
                  ? user.habits.map((habit, index) => {
                      return (
                        <div
                          key={habit._id}
                          className="mt-3 first:mt-0 flex bg-gray-100 justify-between"
                        >
                          <div
                            onClick={
                              habit.type === 1
                                ? () => habitCounterChangeHandler(index)
                                : undefined
                            }
                            className={`${
                              habit.type === 1
                                ? "bg-blue-500 hover:bg-blue-800 text-white cursor-pointer"
                                : "bg-gray-200 text-gray-400"
                            }  transition-colors duration-200 w-20 flex items-center justify-center`}
                          >
                            <FaPlusCircle />
                          </div>
                          <div
                            onClick={() => habitClickHandler(index)}
                            className="relative py-3 flex flex-col justify-start w-full px-5 hover:bg-gray-200 transtition duration-200 cursor-pointer"
                          >
                            <div>{habit.title}</div>
                            {((habit.type === 1 && habit.positiveCounter > 0) ||
                              (habit.type === 2 &&
                                habit.negativeCounter < 0)) && (
                              <div className="absolute bottom-3 right-3 flex items-center text-gray-500">
                                <div>
                                  {habit.type === 1 ? (
                                    <AiOutlineForward />
                                  ) : (
                                    <AiFillBackward />
                                  )}
                                </div>
                                <div>
                                  {habit.type === 1
                                    ? habit.positiveCounter
                                    : habit.negativeCounter}
                                </div>
                              </div>
                            )}
                            <div className="text-md flex items-center text-gray-600">
                              {habit.type === 1 ? (
                                <>
                                  <span className="mr-2">
                                    + {habit.difficulty * 5}
                                  </span>{" "}
                                  <BsFillSuitDiamondFill className="text-yellow-500" />
                                </>
                              ) : (
                                <>
                                  <span className="mr-2">- 4</span>{" "}
                                  <FaHeart className="text-red-500" />
                                </>
                              )}
                            </div>
                          </div>
                          <div
                            onClick={
                              habit.type === 2
                                ? () => habitCounterChangeHandler(index)
                                : undefined
                            }
                            className={`${
                              habit.type === 2
                                ? "bg-blue-500 hover:bg-blue-800 text-white cursor-pointer"
                                : "bg-gray-200 text-gray-400"
                            }  transition-colors duration-200 w-20 flex items-center justify-center`}
                          >
                            <FaMinusCircle />
                          </div>
                        </div>
                      );
                    })
                  : "Start creating Habits"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
