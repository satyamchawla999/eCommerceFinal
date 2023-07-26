import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CartItems, CartInfoSection } from "./subComponents";
import "../assets/styles/cart.scss";
import { setCoupon } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { getCartItemsFromDB, deleteItems, addCart } from "../Utils/service";
import { getCartDetails } from "../Utils/constant";
import { setCartItemQuantity, deleteCartItem } from "../features/user/cartSlice"
import { deleteCartItems } from "../features/user/actionCreator";


const Cart = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);


  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [change, setChange] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  // const [cartInfo, setCartInfo] = useState(false);
  const [couponData, setCouponData] = useState("");
  const [cartQuantity, setCartQuantity] = useState(0);
  const [total, setTotal] = useState(discount + delivery + cartTotal);
  const cartItems= useSelector((state) => state.cart.cartItems);
  console.log(cartItems)

  let Coupon = useRef(null);

  useEffect(() => {

    let details = getCartDetails(cartItems);
    dispatch(setCoupon({ coupon: couponData }));

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
      dispatch(setCoupon({ coupon: couponData }));
    } else if (couponData === "EPIC") {
      setDelivery(200);
      setDiscount(totalDiscount);
      setTotal(details?.sum - totalDiscount + 200);
      dispatch(setCoupon({ coupon: couponData }));
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
  //       dispatch(setCoupon({ coupon: couponData }));

  //       const response = await getCartItemsFromDB(userData.uid);

  //       if (response.status === 201) {
  //         let data = response.data;
  //         let sum = 0;
  //         let quantity = 0;

  //         const getDetails = () => {
  //           data.forEach((item) => {
  //             let price =
  //               parseInt(item.product.price) * parseInt(item.quantity);
  //             quantity = quantity + parseInt(item.quantity);
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
  //           setDelivery(0);
  //           setTotal(0 + details?.sum);
  //           dispatch(setCoupon({ coupon: couponData }));
  //         } else if (couponData === "EPIC") {
  //           setDiscount(d);
  //           setTotal(details?.sum - d + 200);
  //           dispatch(setCoupon({ coupon: couponData }));
  //         } else {
  //           setTotal(200 + details?.sum - discount);
  //         }

  //         setCartInfo(true);
  //         dispatch(setCoupon({ coupon: couponData }));
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getCartItems();
  // }, [change]);


    

  const handleQuantityChange = async (quantity, productId) => {
    dispatch(setCartItemQuantity({ quantity, productId }));
    setChange(!change);
  }

  const handleItemDelete = async (itemId, quantity) => {
    setCartQuantity(Math.abs(cartQuantity - quantity));
    dispatch(deleteCartItems({uid:userData.uid,itemId,type:"cart"})).unwrap().then(()=>{
      setChange(!change);
    });
  };
   

  // const handleQuantityChange = async (q, pid) => {
  //   const quantity = q;
  //   const data = {
  //     uid: userData.uid,
  //     pUid: pid,
  //     quantity: quantity,
  //     update: true,
  //   };

  //   console.log(data);

  //   try {
  //     const response = await addCart(data);

  //     if (response.status === 201) {
  //       console.log("added to cart");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setChange(!change);
  // };



  // const handleItemDelete = async (index, qty) => {
  //   setCartQuantity(Math.abs(cartQuantity - qty));
  //   try {
  //     const response = await deleteItems(userData.uid, index, "cart");

  //     if (response.status === 201) {
  //       console.log(response.data);
  //       setChange(!change);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="cart">
      <p className="heading">CART</p>

      <div className="cartContainer">
        <div className="cartItemSection">
          {cartItems.length === 0 && (
            <div className="emptyCart">
              <img src="https://shop.millenniumbooksource.com/static/images/cart1.png"></img>
            </div>
          )}
          {cartItems.map((item, index) => (
            <CartItems
              page={"cart"}
              key={index}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleItemDelete={handleItemDelete}
            />
          ))}
        </div>

        <>
          {/* {cartInfo === true && ( */}
            <CartInfoSection
              cartTotal={cartTotal}
              cartQuantity={cartQuantity}
              discount={discount}
              delivery={delivery}
              total={total}
              Coupon={Coupon}
              setTotal={setTotal}
              setCouponData={setCouponData}
              // cartInfo={cartInfo}
              page="cart"
            />
          {/* )} */}
        </>
      </div>
    </div>
  );
};

export default Cart;
