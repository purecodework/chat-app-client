import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * return:
 * handleSignup()
 * handleLogin()
 * account and password input
 */

const useLandingPage = () => {
  const { auth, login, logout } = useAuth();
  const { isLoading, sendRequest } = useFetch();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const toggleOption = () => {
    setToggle(!toggle);
  };

  const enterAccount = (e) => setAccount((prev) => e.target.value);
  const enterPassword = (e) => setPassword((prev) => e.target.value);

  const handleLogIn = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BASE_URL + "users/login",
        "POST",
        JSON.stringify({ account, password })
      );

      if (responseData) {
        login(responseData.userId, responseData.token);
        navigate("/chat");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async () => {
    const responseData = await sendRequest(
      process.env.REACT_APP_BASE_URL + "users/signup",
      "POST",
      JSON.stringify({ account, password })
    );
    login(responseData.userId, responseData.token);
    navigate("/chat");
  };

  return {
    isLoading,
    auth,
    toggleOption,
    toggle,
    account,
    enterAccount,
    enterPassword,
    password,
    handleSignUp,
    handleLogIn,
  };
};

export default useLandingPage;
