import React from "react";
import useLandingPage from "./useLandingPage";

const LandingPage = () => {
  const {
    isLoading,
    handleSignUp,
    handleLogIn,
    toggleOption,
    toggle,
    account,
    enterAccount,
    password,
    enterPassword,
  } = useLandingPage();

  return (
    <div className="flex border rounded-lg shadow-lg w-full max-w-md lg:max-w-4xl">
      <div className="hidden rounded-l-lg lg:block lg:w-2/5 bg-cover bg-[url('https://images.unsplash.com/photo-1578186227277-71c5e443adf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3411&q=80')]" />
      <div className="w-full p-16 lg:w-3/5">
        <h1 className="text-center text-xl mb-10">
          {toggle ? "Get started" : "Welcome Back"}
        </h1>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Account
          </label>
          <input
            className=" text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full"
            type="string"
            value={account}
            onChange={enterAccount}
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
          </div>
          <input
            className=" text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full "
            type="password"
            value={password}
            onChange={enterPassword}
          />
        </div>
        <div className="mt-8">
          <button
            onClick={toggle ? handleSignUp : handleLogIn}
            className={` ${
              toggle
                ? "bg-sky-700 hover:bg-sky-600"
                : "bg-gray-700 hover:bg-gray-600"
            } text-white font-bold py-2 px-4 w-full rounded  `}
          >
            {isLoading ? "loading..." : toggle ? "Sign up" : "Login"}
          </button>
          {toggle ? (
            <div className="text-center mt-5">
              Already have an account?{" "}
              <span className="text-sky-600" onClick={toggleOption}>
                Login
              </span>
            </div>
          ) : (
            <div className="text-center mt-5">
              Dont have account?{" "}
              <span className="text-sky-600" onClick={toggleOption}>
                signup
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
