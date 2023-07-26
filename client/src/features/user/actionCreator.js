import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_API = process.env.REACT_APP_USER_API

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async(data)=>{
        const response = await axios.post(
            `${USER_API}add-cart`, data
          );
        return response;
    }
)

export const deleteCartItems = createAsyncThunk(
    "cart/deleteCartItems",
    async(data)=>{
        const response = await axios.post(
            `${USER_API}delete-items`, data
          );
        return response;
    }
)