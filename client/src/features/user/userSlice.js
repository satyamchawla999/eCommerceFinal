import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:false,
    userData:{},
    coupon:""
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers : {
        setUser : (state)=>{
            state.user = true;
        },
        setUserData : (state,action)=>{
            state.userData = action.payload;
        },
        deleteUser : (state)=>{
            state.user = false;
            console.log(state.user,"delete user")
            state.userData = {};
        },
        setCoupon : (state,action)=>{
            console.log(action.payload)
            state.coupon = action.payload.coupon;
        },
    }
});

export const {setUser,deleteUser,setUserData,setCoupon} = userSlice.actions;

export default userSlice.reducer;