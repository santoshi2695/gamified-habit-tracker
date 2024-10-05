import React, { useContext, useReducer } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import AppContext from "../store/app-context";

const initialHabitState = {
  title: "",
  type: 1, // 1, 2
  difficulty: 2, // 1, 2, 3, 4
  resetCounterType: 1, // 1, 2, 3
};

const habitReducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return {
        ...state,
        title: action.payload.title,
      };
    case "TYPE":
      return {
        ...state,
        type: action.payload.type,
      };
    case "DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload.diff,
      };
    case "RESET_COUNTER":
      return {
        ...state,
        resetCounterType: action.payload.resetCounterType,
      };

    default:
      return state;
  }
};

const HabitModal = ({ modalIsOpen, habitModalState, onClose }) => {
  const { user, handleAddHabit, handleUpdateHabit, handleDeleteHabit } =
    useContext(AppContext);
  const [habitState, dispatchHabitAction] = useReducer(
    habitReducer,
    habitModalState || initialHabitState
  );

  const habitSaveHandler = () => {
    const { title, resetCounterType, type, difficulty } = habitState;
    if (title.trim().length === 0) {
      toast.error("Please enter a title");
      return;
    }
    onClose();
    if (habitModalState) {
      axiosInstance
        .put(`/habit/${habitModalState.id}`, {
          title: habitState.title,
          user: user._id,
          type: habitState.type,
          difficulty: habitState.difficulty,
          resetCounterType: habitState.resetCounterType,
        })
        .then((response) => {
          const habit = response.data.data.habit;
          handleUpdateHabit(habitModalState.index, habit);
          toast.success("Habit updated");
        })
        .catch(() => {
          toast.error("Error in updating habit");
        });
    } else {
      axiosInstance
        .post("/habit/", {
          title,
          user: user._id,
          type,
          difficulty,
          resetCounterType,
        })
        .then((response) => {
          const habit = response.data.data.habit;
          handleAddHabit(habit);
          toast.success("Habit saved");
        })
        .catch(() => {
          toast.error("Error in saving habit");
        });
    }
  };

  const habitDeleteHandler = () => {
    onClose();
    axiosInstance
      .delete(`/habit/${habitModalState.id}`)
      .then(() => {
        handleDeleteHabit(habitModalState.index);
        toast.success("Habit deleted");
      })
      .catch(() => {
        toast.error("Error in deleting habit");
      });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <div className="w-[45vw] h-[70vh]">
        <div className="flex justify-between bg-blue-100 px-10 py-5">
          <div className="text-lg text-black flex ">
            {habitModalState && (
              <div
                onClick={habitDeleteHandler}
                className="py-2 flex justify-center items-center transition duration-200 cursor-pointer px-5 mr-2 bg-gray-50"
              >
                Delete
              </div>
            )}
            <div
              onClick={habitSaveHandler}
              className="py-2 flex justify-center items-center transition duration-200 cursor-pointer px-5 mr-2 bg-blue-600 hover:bg-blue-800 text-white"
            >
              {habitModalState ? "Update" : "Save"}
            </div>
          </div>
          <div
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer text-xl text-black text-bold"
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-10 py-5 text-lg">
          <form>
            <div>
              <label className="block mb-1">Task Title</label>
              <input
                type="text"
                className="border text-black border-gray-500 active:border-blue-600 focus:border-blue-600 outline-none w-full py-2 px-4 text-lg"
                placeholder="eg. Drink Water"
                onChange={(event) =>
                  dispatchHabitAction({
                    type: "TITLE",
                    payload: {
                      title: event.target.value,
                    },
                  })
                }
                value={habitState.title}
              />
            </div>
            <div className="flex items-center pt-5 w-1/2 justify-between mx-auto">
              <div className="relative flex flex-col items-center">
                <div
                  onClick={() =>
                    dispatchHabitAction({
                      type: "TYPE",
                      payload: {
                        type: 1,
                      },
                    })
                  }
                  className={`cursor-pointer border-2 p-2 rounded-full border-gray-500 text-gray-500 ${
                    habitState.type === 1
                      ? "border-2 border-blue-500 bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  <FaPlus />
                </div>
                <label className="text-base mt-1">Positive</label>
              </div>
              <div className="relative flex flex-col items-center">
                <div
                  onClick={() =>
                    dispatchHabitAction({
                      type: "TYPE",
                      payload: {
                        type: 2,
                      },
                    })
                  }
                  className={`cursor-pointer border-2 p-2 rounded-full border-gray-500 text-gray-500 ${
                    habitState.type === 2
                      ? "border-2 border-blue-500 bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  <FaMinus />
                </div>
                <label className="text-base mt-1">Negative</label>
              </div>
            </div>
            <div className="pt-3">
              <label className="block mb-1">Difficulty</label>
              <div className="w-5/6 mx-auto flex items-center justify-center">
                <div className="mr-8 last:mr-0 flex flex-col justify-center items-center">
                  <div
                    onClick={() =>
                      dispatchHabitAction({
                        type: "DIFFICULTY",
                        payload: {
                          diff: 1,
                        },
                      })
                    }
                    className={`${
                      habitState.difficulty === 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    } cursor-pointer flex justify-center items-center w-[4rem] h-[4rem]`}
                  >
                    <BsFillSuitDiamondFill />
                  </div>
                  <div className="text-base text-gray-600 mt-1 text-center">
                    Trivial
                  </div>
                </div>
                <div className="mr-8 last:mr-0 flex flex-col justify-center items-center">
                  <div
                    onClick={() =>
                      dispatchHabitAction({
                        type: "DIFFICULTY",
                        payload: {
                          diff: 2,
                        },
                      })
                    }
                    className={`${
                      habitState.difficulty === 2
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    } cursor-pointer flex justify-center items-center w-[4rem] h-[4rem]`}
                  >
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                  </div>
                  <div className="text-base text-gray-600 mt-1 text-center">
                    Easy
                  </div>
                </div>
                <div className="mr-8 last:mr-0 flex flex-col justify-center items-center">
                  <div
                    onClick={() =>
                      dispatchHabitAction({
                        type: "DIFFICULTY",
                        payload: {
                          diff: 3,
                        },
                      })
                    }
                    className={`${
                      habitState.difficulty === 3
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    } cursor-pointer flex justify-center items-center w-[4rem] h-[4rem]`}
                  >
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                  </div>
                  <div className="text-base text-gray-600 mt-1 text-center">
                    Medium
                  </div>
                </div>
                <div className="mr-8 last:mr-0 flex flex-col justify-center items-center">
                  <div
                    onClick={() =>
                      dispatchHabitAction({
                        type: "DIFFICULTY",
                        payload: {
                          diff: 4,
                        },
                      })
                    }
                    className={`${
                      habitState.difficulty === 4
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    } cursor-pointer p-2 flex-wrap flex justify-center items-center w-[4rem] h-[4rem]`}
                  >
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                    <BsFillSuitDiamondFill />
                  </div>
                  <div className="text-base text-gray-600 mt-1 text-center">
                    Hard
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <label className="block mb-1">Reset Counter</label>
              <div className="w-5/6 mx-auto flex items-center justify-center text-base">
                <div
                  onClick={() =>
                    dispatchHabitAction({
                      type: "RESET_COUNTER",
                      payload: {
                        resetCounterType: 1,
                      },
                    })
                  }
                  className={`cursor-pointer mr-8 last:mr-0 py-2 flex flex-col justify-center items-center  w-1/5 ${
                    habitState.resetCounterType === 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  Daily
                </div>
                <div
                  onClick={() =>
                    dispatchHabitAction({
                      type: "RESET_COUNTER",
                      payload: {
                        resetCounterType: 2,
                      },
                    })
                  }
                  className={`cursor-pointer mr-8 last:mr-0 py-2 flex flex-col justify-center items-center  w-1/5 ${
                    habitState.resetCounterType === 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  Monthly
                </div>
                <div
                  onClick={() =>
                    dispatchHabitAction({
                      type: "RESET_COUNTER",
                      payload: {
                        resetCounterType: 3,
                      },
                    })
                  }
                  className={`cursor-pointer mr-8 last:mr-0 py-2 flex flex-col justify-center items-center  w-1/5 ${
                    habitState.resetCounterType === 3
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  Yearly
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default HabitModal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};
