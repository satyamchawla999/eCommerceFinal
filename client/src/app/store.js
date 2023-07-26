import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cartReducer from "../features/user/cartSlice";
import usersReducer from "../features/user/userSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({

    cart: cartReducer,
    users: usersReducer

})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    // middleware: [thunk]
});

export const persistor = persistStore(store);



// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// import usersReducer from "../features/user/userSlice";
// import cartReducer from "../features/user/cartSlice";

// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, usersReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

// export const persistor = persistStore(store);