import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Expense, Revenue} from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    reducerPath: "main",
    tagTypes : ["Expenses",'Revenues'],
    endpoints: (build) => ({
        getExpenses: build.query<Array<Expense>,void>({
            query: () => '/expense',
            providesTags: ["Expenses"],
        }),
        getRevenues: build.query<Array<Revenue>,void>({
            query: () => '/revenue',
            providesTags: ['Revenues'],
        }),
    })
})

export const { useGetExpensesQuery, useGetRevenuesQuery} = api;

