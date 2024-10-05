import React from "react";
import illustration from "../assets/undraw_activity_tracker_re_2lvv (1).svg";

const Home = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="relative w-2/3 h-full bg-gradient-to-r from-blue-800 to-sky-500">
        <div>
          <img
            src={illustration}
            alt="home illustration activity tracker"
            className="absolute w-[30rem] bottom-0 right-0"
          />
        </div>
        <div className="absolute top-1/3 px-12">
          <div className="text-7xl text-white font-medium">
            Gamify your Life
          </div>
          <p className="text-3xl mt-3 text-neutral-50">
            Motivate yourself to work on your Habits.
          </p>
          <p className="w-3/4 text-xl mt-10 text-neutral-100">
            With in-game rewards and punishments, you can keep track of your
            habits.
          </p>
        </div>
      </div>
      <div className="w-1/3 h-full flex items-center">
        <hanko-auth />
      </div>
    </div>
  );
};

export default Home;
