// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SignInBody {
  username: string;
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

    createReader: builder.mutation({
      query: (body) => ({
        url: '/reader',
        method: 'POST',
        body,
      }),
    }),

    updateReader: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reader/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteReader: builder.mutation({
      query: (id: number) => ({
        url: `/reader/${id}`,
        method: 'DELETE',
      }),
    }),

    createBook: builder.mutation({
      query: (body) => ({
        url: '/book',
        method: 'POST',
        body,
      }),
    }),

    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `/book/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteBook: builder.mutation({
      query: (id: number) => ({
        url: `/reader/${id}`,
        method: 'DELETE',
      }),
    }),

    getPolicy: builder.mutation({
      query: () => ({
        url: '/policy',
        method: 'GET',
      }),
    }),

    createPolicy: builder.mutation({
      query: (body) => ({
        url: '/policy',
        method: 'POST',
        body,
      }),
    }),

    updatePolicy: builder.mutation({
      query: ({ id, body }) => ({
        url: `/policy/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useCreateReaderMutation,
  useUpdateReaderMutation,
  useDeleteReaderMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetPolicyMutation,
  useCreatePolicyMutation,
  useUpdatePolicyMutation,
} = libraryApi;
