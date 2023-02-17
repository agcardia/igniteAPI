import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from 'react';


const AddRevenue = () => {

  const [payDate,setPayDate] = useState<Date|null>(null);

  const handleChange = (date: Date|null) => {
    setPayDate(date);
  }

  return (
     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter expense name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" placeholder="Amount ($)" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <DatePicker
          selected={payDate}
          onChange={setPayDate}
          name="date"
          dateFormat="MM/dd/yyyy"
        />
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

      <Form.Select aria-label="paymethod">
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

export default AddRevenue
