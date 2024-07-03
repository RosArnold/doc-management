import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Function to get the token
const getToken = () => {
  return localStorage.getItem("token");
};

interface LoginRequestPayload {
  email: string;
  password: string;
}

interface RegisterRequestPayload {
  email: string;
  password: string;
}
// Custom fetchBaseQuery with token
const baseQueryWithToken = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("token", `${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    attempToLogin: builder.mutation({
      query: (data: LoginRequestPayload) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    attempToRegister: builder.mutation({
      query: (data: RegisterRequestPayload) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAttempToLoginMutation, useAttempToRegisterMutation } = api;
