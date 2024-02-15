import { configureStore } from "@reduxjs/toolkit";
import {
  pakageCartSetReducer,
  domainSearchCartSetReducer,
} from "./slice/UserSlice.jsx";

const store = configureStore({
  reducer: {
    packageCart: pakageCartSetReducer,
    domainSearchCart: domainSearchCartSetReducer,
  },
});

export default store;
