import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import axios from "axios";
import "../../assets/styles/order.scss";
import { useSelector } from "react-redux";

function Orders(props) {
  const { display } = props;
  const userData = useSelector((state) => state.users.userData);
  const [orders, setOrders] = useState([]);
  const [change, setChange] = useState(false);
  console.log(orders);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/order/get-orders",
          { role: userData.role, uid: userData.uid, display:display }
        );

        if (response.status === 201) {
          setOrders(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [change]);

  const handleStatusChange = async (value, id) => {
    const status = value;
    const data = {
      _id: id,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/order/change-status",
        data
      );

      if (response.status === 201) {
        console.log("status changed");
        setChange(!change);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    console.log(id)
    try {
      const response = await axios.post(
        "http://localhost:8000/order/cancel-order",
        {_id:id}
      );

      if (response.status === 201) {
        console.log("order cancel");
        setChange(!change);
      }
    } catch (err) {
      console.log(err);
    }
  } 

  return (
    <div className="order">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {display}
      </h2>

      <div className="orderContainer">
      <div className="orderItemSection">
  {orders.length === 0 ? (
    <div className="emptyCart">
      <img src="https://shop.millenniumbooksource.com/static/images/cart1.png" />
    </div>
  ) : (
    userData.role === "Admin" && display === "Orders" ? (
      orders.map((item, index) =>
        userData.uid !== item.cUid && (
          <CartItems
            page="orders"
            key={index}
            item={item}
            handleStatusChange={handleStatusChange}
            display={display}
            handleCancel={handleCancel}
          />
        )
      )
    ) : (
      orders.map((item, index) =>
        (userData.uid === item.cUid ||
          userData.uid === item.vUid ||
          userData.role === "Admin") && (
          <CartItems
            page="orders"
            key={index}
            item={item}
            handleStatusChange={handleStatusChange}
            display={display}
            handleCancel={handleCancel}
          />
        )
      )
    )
  )}
</div>
      </div>
    </div>
  );
}

export default Orders;
