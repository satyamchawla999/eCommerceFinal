import React, { useState, useEffect } from "react";
import axios from "axios"
import {useSelector} from "react-redux";
import "../../assets/styles/vendorList.scss";
import VendorListItems from "./VendorListItems";
import { getUsersFromDB, validateUser } from "../../Utils/service";

const VendorList = (props) => {
  const { display } = props;

  const userData = useSelector((state)=>state.userData)

  const [update, setUpdate] = useState(false);
  const [vendor, setVendor] = useState([]);
  console.log(vendor)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getUsersFromDB("Vendor");
        if ((response.status = 201)) {
          setVendor(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [update]);

  const handleClick = async (id) => {
    try {
        const response = await validateUser(id)
        if ((response.status = 201)) {
          setUpdate(!update);
        }
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div className="vendorList">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {display}
      </h2>
      <div className="VendorListContainer">
        <ul role="list" class="divide-y divide-gray-100">
          {vendor.map((item) => (
            <VendorListItems key={item.uid} item={item} handleClick={handleClick}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorList;
