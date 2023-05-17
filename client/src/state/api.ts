import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Expense, Revenue, Quote, Client} from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    reducerPath: "main",
    tagTypes : ["Expenses",'Revenues','Quotes','Clients'],
    endpoints: (build) => ({
        getExpenses: build.query<Array<Expense>,void>({
            query: () => '/expense',
            providesTags: ["Expenses"],
        }),
        getRevenues: build.query<Array<Revenue>,void>({
            query: () => '/revenue',
            providesTags: ['Revenues'],
        }),
        getQuotes: build.query<Quote,void>({
            query: () => '/quote',
            providesTags: ['Quotes'],
        }),
        getClients: build.query<Client,void>({
            query: () => '/client',
            providesTags: ["Clients"],
        }),
    })
})

export const { useGetExpensesQuery, useGetRevenuesQuery, useGetQuotesQuery, useGetClientsQuery} = api;

