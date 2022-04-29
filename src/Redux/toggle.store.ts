import { configureStore } from "@reduxjs/toolkit";
import togglesReducer from "./Reducers/toggle.reducer";

const store = configureStore({
    reducer: togglesReducer
});

export default store;