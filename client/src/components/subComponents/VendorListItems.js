import React, { useState } from "react";
import { BASE_USER_IMG_URL } from "../../Utils/constant";

const VendorListItems = (props) => {

  const { item,handleClick } = props;
  const [validation, setValidation] = useState(item.validation);
  console.log("validation",item.validation);

  return (
    <>
      <li className="flex justify-between gap-x-6 py-5 vItem">
        <div className="flex gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={BASE_USER_IMG_URL + item?.imgUrl[0]}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {item.email}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end justify-center">
          {item.validation ? (
            <button style={{ color: "green" }} onClick={()=>handleClick(item.uid)}>Enabled</button>
          ) : (
            <button style={{ color: "red" }} onClick={()=>handleClick(item.uid)}>Disabled</button>
          )}
        </div>
      </li>
    </>
  );
};

export default VendorListItems;
