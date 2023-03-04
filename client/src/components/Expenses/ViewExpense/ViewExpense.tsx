import React, {useState, useEffect} from 'react';
import './ViewExpense.css';
import Table from 'react-bootstrap/Table';

const ViewExpense = () => {
    
  const [data,setData] = useState<Array<any> | null>(null);
  useEffect(() => {
    console.log("fetching data...")
    fetch('http://127.0.0.1:5000/expense')
        .then(res => res.json())
        .then(data => setData(data.Results))
        .catch(error => console.log("error in fetch"));
  }, [])

  console.log(data);

  return (
    <>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Pay Method</th>
          </tr>
        </thead>
        <tbody>
          {data ? (data.map(expense => (
            <tr>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td>{expense.payMethod}</td>
            </tr>
          ))
          ) : <p>Loading ...</p>}
        </tbody>
      </Table>
    </>

  )
}

export default ViewExpense
