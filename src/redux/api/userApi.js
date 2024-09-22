import { api } from "./index";

const userApi = api.injectEndpoints({
   endpoints: (build) => ({
      getUser: build.query({
         query: (page = 1) => ({
            url: `/users?page=${page}`,
         }),
         providesTags: ["USER"],
      }),
      deleteUser: build.mutation({
         query: (id) => ({
            url: `/users/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["USER"],
      }),
      detailsUser: build.query({
         query: (id) => ({
            url: `/users/${id}`,
         }),
         providesTags: ["USER"],
      }),
      createUser: build.mutation({
         query: (body) => ({
            url: "/users",
            method: "POST",
            body,
         }),
         invalidatesTags: ["USER"],
      }),
   }),
});

export const { useGetUserQuery, useDeleteUserMutation, useDetailsUserQuery, useCreateUserMutation } = userApi;
