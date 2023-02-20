import React from 'react';
import Form from 'react-bootstrap/Form';

const AddReciepts = () => {
  return (
    <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Reciept Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
  )
}

export default AddReciepts
