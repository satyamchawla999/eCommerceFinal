import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "../../firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserImages } from "../../Utils/constant";

import "../../assets/styles/header.scss";

const Header = () => {
  const user = useSelector((state) => state.users.user);
  const userData = useSelector((state) => state.users.userData)

  const [img, setImg] = useState(getUserImages(userData));
  const [subMenu, setSubMenu] = useState(false);
  const [subMenuWomen, setSubMenuWomen] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setImg(getUserImages(userData));
    // setUserData(userData)
    // console.log("hello")
  }, []);

  const handleLogOut = async () => {
    await logout();
    // setUserData({})
    dispatch(deleteUser())
    navigate("/signin");
    setOpen(!open)
  };

  const handleClick = async (category, subCategory) => {
    const data = {
      category: category,
      subCategory: subCategory,
    };

    navigate(
      {
        pathname: "/productcollection",
      },
      {
        state: data,
      }
    );

    window.location.reload(); 
  };

  const handleNavigate = (state) => {
    navigate({ pathname: "/profile" }, { state: state });
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="left">
        {userData.role === "Admin" && (
          <>
            <Link to="/adminchat">
              <p style={{ fontSize: "25px", marginRight: "20px" }}>
                <i className="fa-solid fa-headset"></i>
              </p>
            </Link>
          </>
        )}
        <img
          onClick={() => setOpen(!open)}
          src={require("../../assets/images/bars.png")}
          alt="#"
        />
      </div>

      <div className="mid">
        <Link className="homeLink" to="/">
          <img
            src="https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"
            alt="#"
          />
        </Link>
      </div>

      <div className="right">
        <img src={require("../../assets/images/heart.png")} alt="#" />
        <img src={require("../../assets/images/search.png")} alt="#" />
        <Link to="/cart">
          <img src={require("../../assets/images/shopping-bag.png")} alt="#" />
        </Link>
        <Link to="/profile">
          <img
            style={{ width: "30px", height: "30px" }}
            src={require("../../assets/images/account.png")}
            alt="#"
          />
        </Link>
      </div>

      {/* {user && ( */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-10 top-5 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <img
                            className="closePanel"
                            onClick={() => setOpen(!open)}
                            src={require("../../assets/images/bars.png")}
                            alt="#"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          <Link to="/profile">
                            <div className="userInfoSideBar">
                              <img src={img.image1} alt="" />
                              <p>{userData.name}</p>
                            </div>
                          </Link>
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}


                        {!user && <>
                          <Link to="/signin"><div onClick={() => setOpen(!open)}
                            className="sideBarItems"
                          >
                            Sign In{" "}
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                          </div></Link>


                          <Link to="/signup" ><div onClick={() => setOpen(!open)}
                            className="sideBarItems" 
                          >
                            Sign Up{" "}
                            <i class="fa-solid fa-user-plus"></i>
                          </div></Link>

                        </>}

                        <div
                          className="sideBarItems"
                          onClick={() => handleNavigate("Profile")}
                        >
                          Profile
                          <i className="fa-regular fa-user"></i>
                        </div>
                        <Link className="sideBarItems" to="/" onClick={() => setOpen(!open)}>
                          Home <i className="fa-solid fa-house"></i>
                        </Link>
                        <Link className="sideBarItems" to="/cart" onClick={() => setOpen(!open)}>
                          Cart <i className="fa-brands fa-opencart"></i>
                        </Link>
                        <div
                          className="sideBarItems"
                          onClick={() => handleClick("", "")}
                        >
                          New Arrivals
                          <i>New</i>
                        </div>
                        <div
                          className="sideBarItems"
                          onClick={() => setSubMenu(!subMenu)}
                        >
                          Men Collection
                          {subMenu ? (
                            <i class="fa-solid fa-minus"></i>
                          ) : (
                            <i className="fa-solid fa-plus"></i>
                          )}
                        </div>
                        <div className={subMenu ? "subMenu" : "hideSubMenu"}>
                          <li onClick={() => handleClick("male", "shirt")}>
                            Shirt
                          </li>
                          <li onClick={() => handleClick("male", "tshirt")}>
                            T-Shirt
                          </li>
                          <li onClick={() => handleClick("male", "shoes")}>
                            Shoes
                          </li>
                          <li onClick={() => handleClick("male", "jeans")}>
                            Jeans
                          </li>
                        </div>
                        <div
                          className="sideBarItems"
                          onClick={() => setSubMenuWomen(!subMenuWomen)}
                        >
                          Women Collection
                          {subMenuWomen ? (
                            <i class="fa-solid fa-minus"></i>
                          ) : (
                            <i className="fa-solid fa-plus"></i>
                          )}
                        </div>
                        <div
                          className={subMenuWomen ? "subMenu" : "hideSubMenu"}
                        >
                          <li onClick={() => handleClick("female", "shirt")}>
                            Shirt
                          </li>
                          <li onClick={() => handleClick("female", "tshirt")}>
                            T-Shirt
                          </li>
                          <li onClick={() => handleClick("female", "shoes")}>
                            Shoes
                          </li>
                          <li onClick={() => handleClick("female", "jeans")}>
                            Jeans
                          </li>
                        </div>
                        <div
                          className="sideBarItems"
                          onClick={() => handleNavigate("Your Orders")}
                        >
                          Your Orders
                          <i>Orders</i>
                        </div>
                        <div
                          className="sideBarItems"
                          onClick={() => handleNavigate("Address")}
                        >
                          Address
                          <i className="fa-regular fa-address-card"></i>
                        </div>

                        {user && <>
                          <button
                            className="sideBarItems button"
                            onClick={handleLogOut}
                          >
                            Logout{" "}
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                          </button>
                        </>}
                        <br></br>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* )} */}
    </div>
  );
};

export default Header;
