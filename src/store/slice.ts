import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST_API } from "../config";
// Function to get the token
const getToken = () => {
  return localStorage.getItem("token");
};

interface LoginRequestPayload {
  email: string;
  password: string;
}

interface RegisterRequestPayload {
  name: string;
  email: string;
  password: string;
}
// Custom fetchBaseQuery with token
const baseQueryWithToken = fetchBaseQuery({
  baseUrl: HOST_API,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `${token}`);
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

    getFolderList: builder.query({
      query: () => `/folders`,
    }),

    createFolder: builder.mutation({
      query: (data: { name: string; parentFolder: string }) => ({
        url: `/folders`,
        method: "post",
        body: data,
      }),
    }),

    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "delete",
      }),
    }),

    updateFolder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/folders/${id}`,
        method: "patch",
        body: data,
      }),
    }),

    getFolder: builder.mutation({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "get",
      }),
    }),

    getDocumentList: builder.query({
      query: () => `/documents`,
    }),

    uploadDocument: builder.mutation({
      query: (data: FormData) => ({
        url: "/documents",
        method: "post",
        body: data,
      }),
    }),

    getDocument: builder.query({
      query: (id) => `/documents/${id}`,
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "delete",
      }),
    }),

    updateDocument: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `documents/`,
        method: "patch",
        body: data,
      }),
    }),

    shareDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}/share`,
        method: "post",
      }),
    }),
    downloadFile: builder.mutation({
      query: () => ({
        url: ``,
      }),
    }),
  }),
});

export const {
  useAttempToLoginMutation,
  useAttempToRegisterMutation,
  useGetFolderListQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetFolderMutation,
  useDownloadFileMutation,
  useGetDocumentListQuery,
  useUploadDocumentMutation,
  useShareDocumentMutation,
  useUpdateDocumentMutation,
  useGetDocumentQuery,
  useDeleteDocumentMutation,
} = api;
