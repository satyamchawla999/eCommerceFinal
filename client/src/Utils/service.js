import axios from "axios";

export const userSignUp = (data) =>axios.post(
  "http://localhost:8000/user/sign-up",
  data
);

export const getProductsFromDB = () =>
  axios.get("http://localhost:8000/product/get-product");

export const getChatMessages = (uid) =>
  axios.post("http://localhost:8000/chat/get-messages", { uid: uid });

export const setUserRole = (data) =>
  axios.post("http://localhost:8000/user/set-user-role", data);
  
export const getCartItemsFromDB = (uid) =>
  axios.post("http://localhost:8000/user/get-cart-items", { uid: uid });

export const deleteItems = (uid, index, type) =>
  axios.post("http://localhost:8000/user/delete-items", {
    uid: uid,
    index: index,
    type: type,
  });

export const addCart = (data) =>
  axios.post("http://localhost:8000/user/add-cart", data);

export const addAddress = (data) =>
  axios.post("http://localhost:8000/user/add-address", data);

export const getAddressFromDB = (uid) =>
  axios.post("http://localhost:8000/user/get-address", { uid: uid });

export const getChatUsersFromDB = () =>
  axios.get("http://localhost:8000/chat/get-chat-users");

export const addOrdersInDB = (data) =>
  axios.post("http://localhost:8000/order/add-order", data);

export const cartEmpty = (uid) =>
  axios.post("http://localhost:8000/user/empty-cart", { uid: uid });

export const sendMessage = (uid, message, sender) =>
  axios.post("http://localhost:8000/chat/send-message", {
    uid: uid,
    message: message,
    sender,
  });

export const addProduct = (formAction, formData) => axios.post(
  `http://localhost:8000/product/${formAction}`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
  }
);

export const getUsersFromDB = (role) => axios.post(
  "http://localhost:8000/user/get-users",
  { role: role }
);

export const validateUser = (id) => axios.post(
  "http://localhost:8000/user/validate-vendor",
  { uid: id }
);

export const updateProfile = (formData) => axios.post(
  `http://localhost:8000/user/update-profile`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
  }
);


