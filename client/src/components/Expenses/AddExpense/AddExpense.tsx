import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState, forwardRef} from 'react';
import './AddExpense.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddExpense = () => {

  const [payDate,setPayDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [payMethod, setPayMethod] = useState<string>('venmo');
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleChange = (date: Date) => {
    setPayDate(date);
  }

  type CustomInputProps = {
    value?: string;
    onClick?: () => void;
  };

  const CustomInput = forwardRef<HTMLButtonElement,CustomInputProps>((props, ref) => {
    return (
      <Button variant="custom" className="customButton" onClick={props.onClick} ref={ref}>{props.value}</Button>
    );
  });

  type Expense = {
    name?:string;
    amount?:number;
    payDate?:Date;
    description?:string;
    payMethod?:string;
  }

  const submitExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data:Expense = {
      name,
      amount:parseInt(amount,10),
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


  return (
    <>
    <div className="addExpense">
    <Form className="expenseForm" onSubmit={submitExpense}>
      <Row className="mb3">
        <Form.Group as={Col} className="mb-3" controlId="expenseName">
          <Form.Label className="text-center w-100">Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter expense name"
            value={name}
            onChange ={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="expenseAmount">
          <Form.Label className="text-center w-100" >Amount</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Amount ($)"
          value={amount}
          onChange ={(event:React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)} />
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
          type="text" 
          placeholder="Enter description"
          value={description}
          onChange = {(event:React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />
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
    <div>Rest of Expenses go Here</div>
    </div>
    </>
  )
}

export default AddExpense