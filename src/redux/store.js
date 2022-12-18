import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";

const persistConfig = {
  key: "Haya",
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(persistConfig, reducers);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: true, serializableCheck: false }),
// });

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }),
});

export const persistedStore = persistStore(store);
export default store;
