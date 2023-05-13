import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './scenes/global/Navbar';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import Expenses from './scenes/expenses/Expenses';
import Revenue from './scenes/revenues/Revenue';
import ExpenseForm from './scenes/forms/expenseForm';
import RevenueForm from './scenes/forms/revenueForm';
import InvoiceForm from './scenes/forms/invoiceForm';
import Dashboard from './scenes/dashboard/Dashboard';
import { themeSettings } from './theme';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="app">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="expense/add" element={<ExpenseForm />} />
                <Route path="expense" element={<Expenses />} />
                <Route path="revenue" element={<Revenue />} />s
                <Route path="revenue/add" element={<RevenueForm />} />
                <Route path="invoice/add" element={<InvoiceForm />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
