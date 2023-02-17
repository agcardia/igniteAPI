import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="Expenses"></Route>
        <Route path="Revenue"></Route>
        <Route path="Invoices"></Route>
        <Route path="Reciepts"></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
