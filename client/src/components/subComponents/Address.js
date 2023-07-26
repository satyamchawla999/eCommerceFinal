import React, { useEffect, useState } from 'react';
import "../../assets/styles/address.scss";
import { useSelector } from "react-redux";
import { AddressItems } from "./index";
import { addAddress, deleteItems, getAddressFromDB } from '../../Utils/service';

const Address = (props) => {
    const { display } = props
    const userData = useSelector((state) => state.users.userData);
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await getAddressFromDB(userData.uid)

                if (response.status === 201) {
                    setAddress(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getAddress();
    }, [newAddress])

    const handleSubmit = async (e) => {

        e.preventDefault()
        const {hno,street,landmark,city,state,pincode} = e.target

        const data = {
            uid: userData.uid,
            hno: hno.value,
            street: street.value,
            landmark: landmark.value,
            city: city.value,
            state: state.value,
            pincode: pincode.value,
        }

        try {
            const response = await addAddress(data)

            if (response.status === 201) {
                setNewAddress(!newAddress);
            }
        } catch (err) {
            console.log(err);
        }

        hno.value = ""
        street.value = ""
        landmark.value = ""
        city.value = ""
        state.value = ""
        pincode.value = "" 
    };

    const handleDelete = async (e,index) => {
        e.stopPropagation();
        try {
            const response = await deleteItems(userData.uid,index,"address")

            if (response.status === 201) {
                console.log(response.data)
                setNewAddress(!newAddress);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="address">

                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">{display}</h2>

                    <label>House No.</label>
                    <input name="hno" type="text" pattern="[^\s]+" required />
                    <label>Street</label>
                    <input name="street" type="text" pattern="[^\s]+" required />
                    <label>Landmark</label>
                    <input name="landmark" type="text" pattern="[^\s]+" required />
                    <label>City</label>
                    <input name="city" type="text" pattern="[^\s]+" required />
                    <label>State</label>
                    <input name="state" type="text" pattern="[^\s]+" required />
                    <label>Pincode</label>
                    <input name="pincode" type="text" pattern="[^\s]+" required />

                    <button>
                        Add Address
                    </button>
                </form>

                <div className="addressItemContainer" style={{overflowY:"scroll"}}>
                    {address?.map((item, index) => <AddressItems key={index} item={item} number={index} handleDelete={handleDelete}/>)}
                </div>
            </div>
        </>

    )
}

export default Address