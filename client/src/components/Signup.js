import { notification, Radio } from "antd";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../firebase/auth";
import { setUserData, setUser } from "../features/user/userSlice";

import "../assets/styles/common.scss";

const Signup = () => {

  const inputRef = useRef(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState("0");
  const [value, setValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({ message: message });
  };

  const radioChange = (e) => setRole(e.target.value);
  

  const authRegistration = async () => {
    try {
      const response = await signInWithGoogle();
      if (response?.status === 201) {
        openNotificationWithIcon("success", "Sign in successful!");

        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response.data));
        }, 500);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Unable to sign up");
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true)
    let { name, USERID, password } = e.target;
    name = name.value;
    USERID = USERID.value;
    password = password.value;

    let email = "NA";
    let phone = "NA";

    if (role === "0") {
      openNotificationWithIcon("error", "Please choose a role");
      setButtonDisable(false)
    } else {
      if (!name || !USERID || !password) {
        openNotificationWithIcon("error", "Please enter all credentials");
        setButtonDisable(false)
        return;
      }

      const isNumber = /^[0-9]+$/.test(USERID);
      const isValidEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(
        USERID
      );

      if (isNumber && USERID.length === 10) phone = USERID;
      else if (isValidEmail) email = USERID;
      else {
        openNotificationWithIcon("error", "Please enter a valid email address or phone number");
        setButtonDisable(false)
        return;
      }

      try {
        const response = await registerWithEmailAndPassword(name, email, phone, password, role);
        if (response) {

          openNotificationWithIcon("success", "Sign in successful!");
          setTimeout(() => {
            dispatch(setUser());
            dispatch(setUserData(response));
            setButtonDisable(false)
          }, 1000)

        } else {
          openNotificationWithIcon("error", "Email already in use");
        }
      } catch (err) {
        console.log(err);
        openNotificationWithIcon("error", "Password must be 6 charachter long");
      }

      e.target.name.value = "";
      e.target.password.value = "";
      e.target.USERID.value = "";
    }
    setButtonDisable(false)
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
      <h1>CREATE ACCOUNT</h1>
      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label>NAME</label>
          <input name="name" type="text" />
          <label>EMAIL OR PHONE NUMBER</label>
          <input
            name="USERID"
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
          />
          <label>PASSWORD</label>
          <input name="password" type="password" />
          <Radio.Group
            className="radio"
            name="role"
            onChange={radioChange}
            value={role}
          >
            <Radio value={"Customer"}>Customer</Radio>
            <Radio value={"Vendor"}>Vendor</Radio>
          </Radio.Group>
          <button disabled={buttonDisable}>{buttonDisable === true ? "SINGING UP... " : "SIGN UP"}</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
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

export default Signup;

