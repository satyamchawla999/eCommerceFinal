import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Signin, Signup, Profile, Cart, CheckoutPage  } from "./";
import { Header, ProductPage, AdminChat } from "./subComponents";
import ProductCollection from "./subComponents/ProductCollection";

const Page404 = () => {
  return <h1>404 not found</h1>;
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.users.user);
  return user ? <Navigate to="/" /> : <>{children}</>;
};

const ProfileRoute = ({ children }) => {
  const user = useSelector((state) => state.users.user);
  return !user ? <Navigate to="/signin" /> : <>{children}</>;
};

const routes = [
  { path: "/", element: <Home /> },
  { path: "/productpage/:id", element: <ProductPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/productcollection", element: <ProductCollection /> },
  { path: "/adminchat", element: <AdminChat /> },
  {
    path: "/signin",
    element: (
      <PrivateRoute>
        <Signin />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PrivateRoute>
        <Signup />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProfileRoute>
        <Profile />
      </ProfileRoute>
    ),
  },
];

const Main = () => {

  return (
    <div className="Main">
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
