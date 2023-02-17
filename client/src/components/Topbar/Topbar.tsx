import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import {Outlet, Link} from 'react-router-dom';
import './Topbar.css';

const Topbar = () => {
  return (
    <>
        <Navbar className="navbar">
            <Container>
                <Nav.Link href="/" className="navitem">Home</Nav.Link>
                <NavDropdown title="Revenue" id="basic-nav-dropdown" className="navitem">
                    <NavDropdown.Item href="/revenue/add">Add Revenues</NavDropdown.Item>
                    <NavDropdown.Item href="/revenue/view">View Revenues</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Expense" id="basic-nav-dropdown" className="navitem">
                    <NavDropdown.Item href="/expense/add">Add Expenses</NavDropdown.Item>
                    <NavDropdown.Item href="/expense/view">View Expenses</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/invoice" className="navitem">Invoices</Nav.Link>
                <Nav.Link href="reciept" className="navitem">Reciepts</Nav.Link>
            </Container>
        </Navbar>
        <Outlet />
    </>
  )
}

export default Topbar
