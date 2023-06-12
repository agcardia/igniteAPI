import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Expense, Revenue, Quote, Client, Invoice, Weather} from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL ? `http://${process.env.REACT_APP_BACKEND_URL}:5000` :'http://localhost:5000'}),
    reducerPath: "main",
    tagTypes : ["Expenses",'Revenues','Quotes','Clients',"Invoices","Weather"],
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
        getInvoices: build.query<Invoice,void>({
            query: () => '/invoice',
            providesTags: ["Invoices"]
        }),
        getWeather: build.query<Weather,void>({
            query: () => '/weather',
            providesTags: ["Weather"],
        })
    })
})

export const { useGetExpensesQuery, useGetRevenuesQuery, useGetQuotesQuery, useGetClientsQuery, useGetInvoicesQuery, useGetWeatherQuery} = api;

