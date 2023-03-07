import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { CssBaseline} from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Navbar from './scenes/global/Navbar';
import Expenses from './scenes/expenses/Expenses';


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
                <Route path="expense/add" />
                <Route path="expense" element={<Expenses />}/>
                <Route path="revenue/add" />
                <Route path="revenue/view"/>
                <Route path="invoice/add"/>
                <Route path="invoice/view"/>
                <Route path="reciept/add"/>
                <Route path="reciept/view" />
              </Routes>
              <div className="rest"></div>
              </main>
        </div>
            </BrowserRouter>
    </>
  );
}

export default App;
