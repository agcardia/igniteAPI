import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState, forwardRef} from 'react';
import { CalendarEvent } from 'react-bootstrap-icons';
import './AddExpense.css';

const AddExpense = () => {

  const [payDate,setPayDate] = useState<Date|null>(null);

  const handleChange = (date: Date|null) => {
    setPayDate(date);
  }

  type CustomInputProps = {
    value?: string;
    onClick?: () => void;
  };

  const CustomInput = React.forwardRef<HTMLButtonElement,CustomInputProps>((props, ref) => {
    return (
      <Button onClick={props.onClick} ref={ref}>{props.value}</Button>
    );
  });


  return (
    <Form>
      <Form.Group className="mb-3" controlId="expenseName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter expense name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="expenseAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" placeholder="Amount ($)" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <div>
          Select a Date
            <DatePicker
              selected={payDate}
              onChange={setPayDate}
              name="date"
              dateFormat="MM/dd/yyyy"
              customInput={<CustomInput/>}
            />
        </div>
      </Form.Group>

      <Form.Label>Paid</Form.Label>
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

      <Form.Select id="expensePaymethod" aria-label="expensePaymethod">
      <option>Paymethod</option>
      <option value="venmo">Venmo</option>
      <option value="creditcard">Credit Card</option>
      <option value="check">Check</option>
    </Form.Select>

    <></>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddExpense