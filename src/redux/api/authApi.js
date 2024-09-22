import { api } from "./index";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        userSignUp: build.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
        userLogin: build.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useUserLoginMutation, useUserSignUpMutation } = authApi