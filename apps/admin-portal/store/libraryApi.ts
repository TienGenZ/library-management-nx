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

    getAllReader: builder.mutation({
      query: () => ({
        url: '/reader',
        method: 'GET',
      }),
    }),

    getReaderById: builder.mutation({
      query: (id: number) => ({
        url: `/reader/${id}`,
        method: 'GET',
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

    getAllBook: builder.mutation({
      query: () => ({
        url: '/book',
        method: 'GET',
      }),
    }),

    getBookById: builder.mutation({
      query: (id: number) => ({
        url: `/book/${id}`,
        method: 'GET',
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
        url: `/book/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllPublisher: builder.mutation({
      query: () => ({
        url: '/publisher',
        method: 'GET',
      }),
    }),

    createPublisher: builder.mutation({
      query: (body) => ({
        url: '/publisher',
        method: 'POST',
        body,
      }),
    }),

    updatePublisher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/publisher/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deletePublisher: builder.mutation({
      query: (id: number) => ({
        url: `/publisher/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllBookType: builder.mutation({
      query: () => ({
        url: '/book-type',
        method: 'GET',
      }),
    }),

    createBookType: builder.mutation({
      query: (body) => ({
        url: '/book-type',
        method: 'POST',
        body,
      }),
    }),

    updateBookType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/book-type/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteBookType: builder.mutation({
      query: (id: number) => ({
        url: `/book-type/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllCheckout: builder.mutation({
      query: () => ({
        url: '/checkout',
        method: 'GET',
      }),
    }),

    createCheckout: builder.mutation({
      query: (body) => ({
        url: '/checkout',
        method: 'POST',
        body,
      }),
    }),

    updateCheckout: builder.mutation({
      query: ({ id, body }) => ({
        url: `/checkout/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteCheckout: builder.mutation({
      query: (id: number) => ({
        url: `/checkout/${id}`,
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

    getQueryReader: builder.mutation({
      query: (query: string) => ({
        url: `/reader/search/${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetAllReaderMutation,
  useGetReaderByIdMutation,
  useCreateReaderMutation,
  useUpdateReaderMutation,
  useDeleteReaderMutation,
  useGetAllBookMutation,
  useGetBookByIdMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetAllBookTypeMutation,
  useCreateBookTypeMutation,
  useUpdateBookTypeMutation,
  useDeleteBookTypeMutation,
  useGetAllPublisherMutation,
  useCreatePublisherMutation,
  useUpdatePublisherMutation,
  useDeletePublisherMutation,
  useGetAllCheckoutMutation,
  useCreateCheckoutMutation,
  useUpdateCheckoutMutation,
  useDeleteCheckoutMutation,
  useGetPolicyMutation,
  useCreatePolicyMutation,
  useUpdatePolicyMutation,
  useGetQueryReaderMutation,
} = libraryApi;
