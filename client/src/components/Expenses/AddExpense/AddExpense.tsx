import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState, useEffect, forwardRef} from 'react';
import './AddExpense.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AddExpense = () => {

  const [validated,setValidated] = useState<boolean>(false);
  const [payDate,setPayDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [payMethod, setPayMethod] = useState<string>('venmo');
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
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

  const CustomInput = forwardRef<HTMLButtonElement,CustomInputProps>((props, ref) => {
    return (
      <Button variant="custom" className="customButton" onClick={props.onClick} ref={ref}>{props.value}</Button>
    );
  });

  const handleChange = (date: Date) => {
    setPayDate(date);
  };

  const submitExpense = async (event: React.FormEvent<HTMLFormElement>) => {


    const form = event.currentTarget;
    if (form.checkValidity() === false || isNaN(parseFloat(amount))) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else { 

      setValidated(true);
    
      const data:Expense = {
        name,
        amount:parseFloat(amount),
        payDate,
        description,
        payMethod
      }
      console.log(data);
      try {
        const response = await fetch('http://127.0.0.1:5000/expense', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
      });
      if(!response.ok) {
        throw new Error("failed to add expense to Cloud Database");
      }
      console.log('Expense added successfully!');
      } catch (error) {
      console.error(error);
      }
    }
  }


  return (
    <>
    <div className="addExpense">
    <Form noValidate validated={validated} className="expenseForm needs-validation" onSubmit={submitExpense}>
    <div className="cardWrapper">
      <b>Add an Expense</b>
      </div>
      <Row className="mb3">
        <Form.Group as={Col} className="mb-3" controlId="expenseName">
          <Form.Label className="text-center w-100">Name</Form.Label>
          <Form.Control
            required
            isInvalid={validated && !name}
            type="text" 
            placeholder="Enter expense name"
            value={name}
            onChange ={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
          <Form.Control.Feedback type="invalid">please enter a valid name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="expenseAmount">
          <Form.Label className="text-center w-100" >Amount</Form.Label>
          <Form.Control 
          required
          type="text" 
          placeholder="Amount ($)"
          value={amount}
          isInvalid={validated && isNaN(parseFloat(amount))}
          onChange ={(event:React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}/>
          <Form.Control.Feedback type="invalid">please enter a valid amount</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
      <Form.Group as={Col}  className="mb-3" controlId="date">
        <div className="wrapper">
          Select a Date
            <DatePicker
              selected={payDate}
              onChange={(date:Date, event: React.SyntheticEvent<any>) =>
                setPayDate(date)}
              name="date"
              dateFormat="MM/dd/yyyy"
              customInput={<CustomInput/>}
            />
        </div>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="isPaid">
        <Form.Label className="text-center w-100">Description</Form.Label>
          <Form.Control
          required
          isInvalid={validated && !description}
          type="text" 
          placeholder="Enter description"
          value={description}
          onChange = {(event:React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/>
        <Form.Control.Feedback type="invalid">please enter a short description</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="payMethod">
        <Form.Label className="text-center w-100">Pay Method</Form.Label>
          <Form.Select id="expensePaymethod" aria-label="expensePaymethod">
            <option value="venmo">Venmo</option>
            <option value="creditcard">Credit Card</option>
            <option value="check">Check</option>
          </Form.Select>
      </Form.Group>
    </Row>
    <></>
    <div className=" wrapper text-center">
      <Button type="submit" variant="custom" className="customButton">
        Submit
      </Button>
    </div>
    </Form>
    <ResponsiveContainer width="100%" height="100%">
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
    <div className="bottomRow">
    <ResponsiveContainer width="60%" height="100%">
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
    <ResponsiveContainer width="100%" height="100%">
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

    </>
  )
}

export default AddExpense