import React, {useState, useEffect} from 'react';
import './ViewExpense.css';
import Table from 'react-bootstrap/Table';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ViewExpense = () => {
    
const [data,setData] = useState<Array<any>>([]);

type Expense = {
    name?:string;
    amount?:number;
    payDate?:Date;
    description?:string;
    payMethod?:string;
};
  
useEffect(() => {
    console.log("fetching data...")
    fetch('http://127.0.0.1:5000/expense')
        .then(res => res.json())
        .then((data) =>  {
          const convertedData = data.Results.map((item:Expense) => {
            return {
              ...item,
              payDate: convertDate({ payDate: item.payDate }),
            };
          });
          setData(convertedData);
        })
        .catch((error) => console.log("error in fetch"));
  }, []);

console.log(data);

type CustomInputProps = {
    value?: string;
    onClick?: () => void;
};
  
function convertDate (inputObject: {payDate?: Date | string}) {
    const date = inputObject.payDate?  new Date(inputObject.payDate): new Date();
    return date.toLocaleDateString();
  }

  return (
    <div className="main">
    <div className="tableWrapper">
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
    </div>
    <div className="graphs">
    <div className="graph">
      <ResponsiveContainer width="80%" height="100%">
      <LineChart width={200} height={200} data={data} 
      margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="payDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="amount"/>
      </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="graph">
      <ResponsiveContainer width="80%" height="100%">
      <BarChart width={200} height={200} data={data} 
      margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="payDate"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8"/>
      </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="graph">
      <ResponsiveContainer width="80%" height="100%" >
      <LineChart width={200} height={200} data={data} 
      margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="payDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="amount"/>
      </LineChart>
      </ResponsiveContainer>
    </div>

    </div>
    </div>

  )
}

export default ViewExpense
