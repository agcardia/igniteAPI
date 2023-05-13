import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { CssBaseline} from '@mui/material';
import Navbar from './scenes/global/Navbar';
import Expenses from './scenes/expenses/Expenses';
import Revenue from './scenes/revenues/Revenue';
import ExpenseForm from './scenes/forms/expenseForm';
import RevenueForm from './scenes/forms/revenueForm';
import InvoiceForm from './scenes/forms/invoiceForm';
import LineGraph from './scenes/graphs/LineGraph';
import Dashboard from './scenes/dashboard/Dashboard';

function App() {
  return (
    <>
      <CssBaseline/>
      <BrowserRouter>
          <div className="app">
          <Navbar/>
          <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="expense/add" element={<ExpenseForm/>}/>
                <Route path="expense" element={<Expenses />}/>
                <Route path="revenue" element={<Revenue/>}/>s
                <Route path="revenue/add" element={<RevenueForm/>}/>
                <Route path="invoice/add" element={<InvoiceForm/>}/>
                <Route path="reciept/add"/>
                <Route path="reciept" />
                <Route path="line" element={<LineGraph />}/>
              </Routes>
          </main>
        </div>
            </BrowserRouter>
    </>
  );
}

export default App;
