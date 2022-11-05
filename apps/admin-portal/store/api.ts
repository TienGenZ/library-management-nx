// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SignInBody {
  email: string;
  password: string;
}

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/api',
  }),

  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body: SignInBody) => ({
        url: '/sign-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = libraryApi;
