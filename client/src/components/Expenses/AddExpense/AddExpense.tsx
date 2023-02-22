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


  return (
    <>
    <div className="addExpense">
    <Form className="expenseForm">
      <Row className="mb3">
        <Form.Group as={Col} className="mb-3" controlId="expenseName">
          <Form.Label className="text-center w-100">Name</Form.Label>
          <Form.Control type="text" placeholder="Enter expense name" />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="expenseAmount">
          <Form.Label className="text-center w-100" >Amount</Form.Label>
          <Form.Control type="text" placeholder="Amount ($)" />
        </Form.Group>
      </Row>
      <Row>
      <Form.Group as={Col} className="mb-3" controlId="date">
        <div className="wrapper">
          Select a Date
            <DatePicker
              selected={payDate}
              onChange={(date:Date, event: React.SyntheticEvent<any>) =>
                setPayDate(date)
              }
              name="date"
              dateFormat="MM/dd/yyyy"
              customInput={<CustomInput/>}
            />
        </div>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="isPaid">
        <Form.Label className="text-center">Paid</Form.Label>
          <Form.Check
              type="radio"
              label="Yes"
              name="paid"
              id="paidYes"
              value="true"
          />
          <Form.Check
              type="radio"
              label="No"
              name="paid"
              id="paidNo"
              value="false"
          />
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
      <Button variant="custom" className="customButton">
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