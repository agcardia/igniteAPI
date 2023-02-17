import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import AddExpense from './components/Expenses/AddExpense/AddExpense';
import AddRevenue from './components/Revenue/AddRevenue/AddRevenue';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Topbar/>}>
        <Route path="expense/add" element={<AddExpense/>} />
        <Route path="expense/view" />
        <Route path="revenue/add" element={<AddRevenue/>}/>
        <Route path="revenue/view" />
        <Route path="invoice"/>
        <Route path="reciept" />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
