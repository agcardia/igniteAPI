export interface Expense {
    amount: number,
    date: Date,
    description: string,
    name: string,
    payMethod: string,
    _v: number,
    _id: string
}

export interface Revenue {
    name: string,
    amount: number,
    date: Date,
    invoiced: boolean,
    paid: boolean,
    payMethod: string,
    _v: number,
    _id: string
}

export interface Quote {
    q: string,
    a: string,
    c: string,
    h: string,
}

export interface Client {
    _id: string,
    name: string,
    dateAdded: Date,
    _v: number
}

export interface Invoice {
    _id: string,
    _v: number,
    name: string,
    date: Date,
    amount: number,
    client: string,
    sent: boolean,
    paid: boolean,
    description: string,
}