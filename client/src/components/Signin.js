import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { notification } from "antd";
import { signInWithGoogle, logInWithEmailAndPassword } from "../firebase/auth";
import { setUserData, setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

import "../assets/styles/common.scss";

const Signin = () => {

  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const navigate = useNavigate()

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const authRegistration = async () => {
    setButtonDisable(true);
    try {
      const response = await signInWithGoogle();
      if (response?.status === 201) {
        openNotificationWithIcon("success", "Sign in successful!");

        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response.data));
          navigate("/")
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Unable to sign up");
    }
    setButtonDisable(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true);

    let { USERID, password } = e.target;

    USERID = USERID.value;
    password = password.value;

    let email = "NA";
    let phone = "NA";

    if (!USERID || !password) {
      openNotificationWithIcon("error", "Please Enter All Credentials");
      setButtonDisable(false);
      return;
    }

    const isNumber = /^[0-9]+$/.test(USERID);
    const isValidEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(
      USERID
    );

    if (isNumber && USERID.length === 10) phone = USERID;
    else if (isValidEmail) email = USERID;
    else {
      openNotificationWithIcon("error", "Please enter a valid email address");
      setButtonDisable(false);
      return;
    }

    try {
      const response = await logInWithEmailAndPassword(email, phone, password);

      if (response.status === 201) {
        openNotificationWithIcon("success", "Sign in successful!");

        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response.data));
          setButtonDisable(false);
        }, 1000);
      } else if (response.status === 204) {
        console.log(response)
        openNotificationWithIcon(
          "error",
          response.statusText
        );
      } else {
        openNotificationWithIcon("error", "User not found");
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "User not found");
    }

    e.target.password.value = "";
    e.target.USERID.value = "";
    setButtonDisable(false);
  };

  const handleChange = (event) => {
    let val = event.target.value;
    const isNumber = /^[0-9]+$/.test(val);

    if (isNumber && val.length > 10) {
      val = val.slice(0, 10);
    }

    setValue(val);
  };

  return (
    <div className="sign">
      {contextHolder}
      <h1>SIGN IN</h1>

      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label>EMAIL OR PHONE NUMBER</label>
          <input
            name="USERID"
            type="text"
            value={value}
            onChange={handleChange}
          />

          <label>PASSWORD</label>
          <input name="password" type="password" />

          <button disabled={buttonDisable}>
            {buttonDisable === true ? "SINGING IN... " : "SIGN IN"}
          </button>
        </form>

        <Link to="/signup">
          <p>Create account</p>
        </Link>

        <button className="authButton" onClick={authRegistration}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            alt="#"
          />
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Signin;
