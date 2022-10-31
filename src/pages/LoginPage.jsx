import { Link } from "react-router-dom";
import React from "react";

export const LoginPage = () => {
  return (
    <div className="h-screen bg-[#1A1E23] flex flex-col justify-center items-center">
      <LoginPanel />
    </div>
  );
};

const navigateToHome = () => {
  history("/");
};

const textInputStyle =
  "input w-80 h-10 border-2 border-gray-400/20 px-4 bg-transparent text-white";

export const LoginPanel = () => {
  return (
    <div className="flex flex-col items-center -translate-y-10">
      <div className="px-auto max-w-xs p-14 mt-10">
        <img src="src/assets/logo.png" alt="" className="w-auto mx-auto" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className={textInputStyle}
          />
        </div>

        <div className="flex flex-col items-center">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={textInputStyle}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-6">
        <Link to="/">
          <button className="btn bg-indigo-600 w-80 h-10 text-white font-bold my-2 normal-case">
            Ingresar
          </button>
        </Link>
      </div>
    </div>
  );
};
