import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CartItems, CartInfoSection } from "./subComponents";
import "../assets/styles/cart.scss";
import { useLocation } from "react-router-dom";
import { getCartItemsFromDB } from "../Utils/service";
import { getCartDetails } from "../Utils/constant";


const CheckoutPage = () => {
  const [couponData, setCouponData] = useState(
    useSelector((state) => state.users.coupon)
  );

  const userData = useSelector((state) => state.users.userData);
  const cartItems= useSelector((state) => state.cart.cartItems);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(delivery + cartTotal - discount);
  const [cartInfo, setCartInfo] = useState(false);
  const [change, setChange] = useState(false);

  const { state } = useLocation();
  console.log(state,"state")

  let Coupon = useRef(null);

  useEffect(() => {

    let details = getCartDetails(cartItems);
    // dispatch(setCoupon({ coupon: couponData }));

    console.log(cartItems,"delete")

    console.log(details?.sum)
    console.log(details?.quantity)

    setCartTotal(details?.sum);
    setCartQuantity(details?.quantity);
    setDelivery(details?.quantity === 0 ? 0 : 200);
    const totalDiscount = details?.sum * 0.25;

    if (couponData === "FREEDEL") {
      setDelivery(0);
      setTotal(0 + details?.sum);
      // dispatch(setCoupon({ coupon: couponData }));
    } else if (couponData === "EPIC") {
      setDelivery(200);
      setDiscount(totalDiscount);
      setTotal(details?.sum - totalDiscount + 200);
      // dispatch(setCoupon({ coupon: couponData }));
    } else {
      if(details?.quantity !== 0) {
        setTotal(200 + details?.sum);
      } else {
        setTotal(details?.sum);
      }
    }

    // setCartInfo(true);

  }, [change]);

  // useEffect(() => {
  //   const getCartItems = async () => {
  //     try {
  //       const response = await getCartItemsFromDB(userData.uid);

  //       if (response.status === 201) {
  //         let data = response.data;
  //         let sum = 0;
  //         let quantity = 0;

  //         const getDetails = () => {
  //           data.forEach((item) => {
  //             let price =
  //               parseInt(item.product.price) * parseInt(item.quantity);
  //             sum = sum + price;
  //           });
  //           return { sum, quantity };
  //         };

  //         let details = getDetails();

  //         setCartItems(response.data);
  //         setCartQuantity(details.quantity);
  //         setCartTotal(details?.sum);
  //         setDelivery(details.quantity === 0 ? 0 : 200);
  //         const d = details?.sum * 0.25;

  //         if (couponData === "FREEDEL") {
  //           console.log("del 0")
  //           setDelivery(0);
  //           setTotal(0 + details?.sum);
  //           // dispatch(setCoupon({coupon:couponData}))
  //         } else if (couponData === "EPIC") {
  //           setDiscount(d);
  //           console.log("epic 0")

  //           setTotal(details?.sum - d + 200);
  //           setDelivery(200);

  //           // dispatch(setCoupon({coupon:couponData}))
  //         } else {
  //           setTotal(200 + details?.sum - discount);
  //         }

  //         setCartInfo(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getCartItems();
  // }, [change]);

  const handleQuantityChange = async (q, pid) => {
    //   const quantity = q;
    //   const data = {
    //     uid: userData.uid,
    //     pUid: pid,
    //     quantity: quantity,
    //     update: true,
    //   }
    //   console.log(data);
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8000/user/add-cart", data
    //     );
    //     if (response.status === 201) {
    //       console.log("added to cart");
    //       setChange(!change)
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const handleItemDelete = async (index) => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8000/user/delete-items", { uid: userData.uid, index: index, type: "cart" }
    //     );
    //     if (response.status === 201) {
    //       console.log(response.data);
    //       setChange(!change)
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  return (
    <div className="cart">
      <p className="heading">Checkout</p>

      <div className="cartContainer">
        <div className="cartItemSection">
          {cartItems.length === 0 && (
            <div className="emptyCart">
              <img src="https://shop.millenniumbooksource.com/static/images/cart1.png"></img>
            </div>
          )}
          {cartItems.map((item, index) => (
            <CartItems
              page="checkout"
              key={index}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleItemDelete={handleItemDelete}
            />
          ))}
        </div>

        {/* {cartInfo === true && ( */}
          <CartInfoSection
            cartItems={cartItems}
            cartTotal={cartTotal}
            discount={discount}
            delivery={delivery}
            total={total}
            Coupon={Coupon}
            setTotal={setTotal}
            item={state}
            page="checkout"
            couponData={couponData}
            setCouponData={setCouponData}
          />
        {/* )} */}
        <></>
      </div>
    </div>
  );
};

export default CheckoutPage;
