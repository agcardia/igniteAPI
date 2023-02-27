import React, {useState, useEffect} from 'react';
import './ViewExpense.css'

const ViewExpense = () => {
    
  const [data,setData] = useState<Array<any> | null>(null);
  useEffect(() => {
    console.log("fetching data...")
    fetch('http://127.0.0.1:5000/expense')
        .then(res => res.json())
        .then(data => setData(data.Results))
        .catch(error => console.log("error in fetch"));
  }, [])

  return (
    <div className="expenseCard">
      <div className="titleCard">Recent Expenses</div>
      <div className="header">
        <div><b>Name</b></div>
        <div><b>Amount</b></div>
        <div><b>Date</b></div>
        <div><b>Description</b></div>
        <div><b>Pay Method</b></div>
      </div>
      {data ? (
        data.map(expense => (
        <div className="rowElement" key={expense._id}>
            <div className="column">{expense.name}</div>
            <div className="column">{expense.amount}</div>
            <div className="column">{new Date(expense.date).toLocaleDateString()}</div>
            <div className="column">{expense.description}</div>
            <div className="column">{expense.payMethod}</div>
        </div>
        ))
      ) : <p>Loading...</p>
      }   
    </div>
  )
}

export default ViewExpense
