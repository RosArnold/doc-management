import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./slice";
import authReducer from "./authSlice";
import documentReducer from "./docSlice";
import folderReducer from "./folderSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    document: documentReducer,
    folder: folderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export default store;
