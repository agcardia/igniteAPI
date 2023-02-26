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
      {data ? (
        data.map(expense => (
        <div className="expense" key={expense._id}>
          <div><b>Name:</b> {expense.name}</div>
          <div><b>Amount:</b> {expense.amount}</div>
          <div><b>Date:</b> {expense.date}</div>
          <div><b>Description:</b> {expense.description}</div>
          <div><b>Pay Method:</b> {expense.payMethod}</div>
        </div>
        ))
      ) : <p>Loading...</p>
      }   
    </div>
  )
}

export default ViewExpense
