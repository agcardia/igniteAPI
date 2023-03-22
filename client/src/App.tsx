import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { CssBaseline} from '@mui/material';
import Navbar from './scenes/global/Navbar';
import Expenses from './scenes/expenses/Expenses';
import Revenue from './scenes/revenues/Revenue';
import Invoice from './scenes/invoices/Invoice';
import ExpenseForm from './scenes/forms/expenseForm';
import RevenueForm from './scenes/forms/revenueForm';
import InvoiceForm from './scenes/forms/invoiceForm';


function App() {
  return (
    <>
      <CssBaseline/>
      <BrowserRouter>
          <div className="app">
          <Navbar/>
          <main className="content">
              <Routes>
                <Route path="/" />
                <Route path="expense/add" element={<ExpenseForm/>}/>
                <Route path="expense" element={<Expenses />}/>
                <Route path="revenue" element={<Revenue/>}/>
                <Route path="revenue/add" element={<RevenueForm/>}/>
                <Route path="invoice" element={<Invoice />}/>
                <Route path="invoice/add" element={<InvoiceForm/>}/>
                <Route path="reciept/add"/>
                <Route path="reciept" />
              </Routes>
          </main>
        </div>
            </BrowserRouter>
    </>
  );
}

export default App;
