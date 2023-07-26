import React, { useEffect, useState } from "react";
import { BASE_IMG_URL } from "../../Utils/constant";
import { useSelector } from "react-redux";
import "../../assets/styles/cart.scss";
// import Product from "../../../../Server/Model/products";

const CartItems = (props) => {
  const {
    item,
    handleQuantityChange,
    handleStatusChange,
    key,
    handleItemDelete,
    page,
    handleCancel
  } = props;

  const getOrderDate = (originalDateTime) => {
    const dateTime = new Date(originalDateTime);
    console.log("date", dateTime)
    return dateTime;
  };

  const [quantity, setQuantity] = useState(item.quantity > 10 ? 10 : item.quantity);
  const userData = useSelector((state) => state.users.userData);
  const itemDate = getOrderDate(item.createdAt).toLocaleDateString();
  const currDate = new Date().getDate();
  const diffrence = currDate - (new Date(itemDate).getDate())
  // console.log("diffrence",currDate - (new Date(itemDate).getDate()));

  let product = {};
  let address = {};
  let productStatus = "";

  if (page !== "orders") {
    product = item?.product;
  } else {
    product = item;
    address = product.address;
    productStatus = product.status
  }

  const max = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const status = ["Successfull", "Shipped", "Out For Delivery", "Delivered"];



  return (
    <div className="cartItems">
      <div className="imgContainer">
        {page === "orders" ? (
          <img src={BASE_IMG_URL + product.imgUrl} alt="#" />
        ) : (
          <img src={BASE_IMG_URL + product.imgUrl[0]} alt="#" />
        )}
      </div>

      <div className="infoContainer">
        <span className="name">{product.name}</span>
        {page === "orders" ? (
          <>
            <br />
            <span>
              Purchased Date :<br />
              {itemDate}
            </span>
            {userData.role === "Admin" ? <span style={{ fontSize: "14px" }}>
              {props?.display === "Your Orders" ? <>Vendor {product.vName}</> : <> Customer {product.cName} <br />
                Vendor {product.vName}</>}

            </span> : <span>
              {userData.role === "Customer" ? "Seller" : "Customer"}:{" "}
              {product.vName}
            </span>}

          </>
        ) : (
          <>
            <span>{product.description}</span>
            <span>Seller: {product.vName}</span>
            <span>{item.createdAt}</span>
          </>
        )}
      </div>

      <div className="qtyContainer">
        {page === "orders" && (
          <>
            <span>Price : {product.price * quantity}.00</span>
          </>

        )}
        <div>
          Quantity :
          {page === "cart" ? (
            <select style={{ border: "none" }}
              name="quantity"
              onChange={(e) =>
                handleQuantityChange(e.target.value, product.uid)
              }
              defaultValue={quantity}
            >
              {max.map((q) => (
                // <option value={q} selected={quantity === q}>
                <option value={q} >

                  {q}
                </option>
              ))}
            </select>
          ) : (
            <>{quantity}</>

          )}<br/>
          {item?.quantity > 10 && <span style={{fontSize:"10px"}}>Note : Max limit is 10 per item</span>
}
          
        </div>

        {page === "orders" && (
          <>
            <br />
            <br />
            {(userData.role === "Customer" || props?.display === "Your Orders")? (
              <>
                <span style={{ border: "none", padding: "0px" }}>{product.status}</span>
              </>

            ) : (
              productStatus === "Delivered" ? <span>{product.status}</span> : 
              <span>
                <select style={{ border: "none", padding: "0px" }}
                  name="status"
                  onChange={(e) =>
                    handleStatusChange(e.target.value, product._id)
                  }
                >
                  {status.map((s) => (
                    <option value={s} selected={product.status === s}>
                      {s}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </>
        )}
      </div>

      {page === "orders" ? (
        <>
          <div className="priceContainer" style={{ fontSize: "12px" }}>
            <p style={{ fontSize: "18px" }}>Address</p>
            <p>House no : {address.hno}</p>
            <p>Street : {address.street}</p>
            <p>Landmark : {address.landmark}</p>
            <p>City : {address.city}</p>
            <p>State : {address.state}</p>
            <p>Pincode : {address.pincode}</p>
          </div>

          {(productStatus === "Successfull"  ) && props?.display === "Your Orders" && (diffrence <= 1 && <div className="priceContainer">
            <span className="cancelButton" onClick={() => handleCancel(item._id)}>Cancel Product</span>
          </div>)}


          {(props?.display === "Orders" &&  productStatus !== "Delivered") && <div className="priceContainer">
            <span className="cancelButton" onClick={() => handleCancel(item._id)}>Cancel Product</span>
          </div>}


        </>

      ) : (
        <div className="priceContainer">
          <span>Price : {product.price * quantity}.00</span>
        </div>
      )}

      {page === "cart" && (
        <div className="removeContainer">
          <p onClick={() => handleItemDelete(item.pUid, quantity)}>Remove</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
