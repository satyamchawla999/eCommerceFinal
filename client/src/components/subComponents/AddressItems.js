import React from "react";
import { useNavigate } from "react-router-dom";

const AddressItems = (props) => {
  const { item, number, handleDelete, page } = props;
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.stopPropagation();
    console.log(item);

    navigate({ pathname: "/checkout" }, { state: item });
  };

  return (
    <div className="addressItems" onClick={handleClick}>
      {!page && (
        <h3>
          <p>Address : {number + 1}</p>
          <i
            className="fa-regular fa-trash-can"
            onClick={(e) => handleDelete(e, number)}
          ></i>
        </h3>
      )}
      <p>Name : {item.hno}</p>
      <p>Street : {item.street}</p>
      <p>Landmark : {item.landmark}</p>
      <p>City : {item.city}</p>
      <p>State : {item.state}</p>
      <p>Pincode : {item.pincode}</p>
    </div>
  );
};

export default AddressItems;
