import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { userSignUp } from "../Utils/service";
import { auth, googleProvider } from "./firebase";

import {
  signOut,
  updateProfile,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    const user = res.user;

    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: "NA",
      password: "NA",
      imgUrl: ["NA", "NA"],
      role: "0",
      authProvider: "Google",
      gNo: "NA",
      bName: "NA",
      bType: "NA",
      validation:true
    };

    const response = await userSignUp(data)

    if (response.status === 201) {
      return response;
    } else {
      return {};
    }

  } catch (err) {
    console.log(err);
  }
};

const logInWithEmailAndPassword = async (email, phone, password) => {
  try {

    const data = {
      email,
      phone,
      password,
      authProvider: "Manual",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-in",
      data
    );

    return response;

  } catch (err) {
    console.error(err);
    return { status: 409 }
  }
};

const registerWithEmailAndPassword = async (name, email, phone, password, role) => {
  try {
    let data = {};
    let user = {};

    if (email !== "NA") {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;
      await updateProfile(user, { displayName: name });
    } else {
      const uniqueId = uuidv4();
      user["uid"] = uniqueId;
    }

    data = {
      uid: user.uid,
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role,
      authProvider: "Manual",
      imgUrl: ["NA", "NA"],
      gNo: "NA",
      bName: "NA",
      bType: "NA",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-up",
      data
    );

    if (response.status === 201) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
