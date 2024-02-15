import { createReducer } from "@reduxjs/toolkit";

const domainSearchCartState = {
  domainSearchCart: [],
};

export const domainSearchCartSetReducer = createReducer(
  domainSearchCartState,
  (builder) => {
    builder.addCase("domainSearchCart", (state, action) => {
      state.domainSearchCart = [...state.domainSearchCart, action.payload];
    });
  }
);

const pakagesCartState = {
  packageCart: [],
};

export const pakageCartSetReducer = createReducer(
  pakagesCartState,
  (builder) => {
    builder.addCase("packageCart", (state, action) => {
      state.packageCart = [...state.packageCart, action.payload];
    });
  }
);
