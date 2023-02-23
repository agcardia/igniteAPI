import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import {Outlet} from 'react-router-dom';
import './Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faFileInvoiceDollar, faReceipt, faMoneyBillTrendUp, faCreditCard} from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
  return (
    <>
        <Navbar className="navbar">
            <Container>
                <Nav.Link href="/" className="homeitem"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link>
                <NavDropdown 
                title={<span><FontAwesomeIcon icon={faMoneyBillTrendUp} /> Revenue</span>} 
                id="basic-nav-dropdown" className="navitem"
                >
                    <NavDropdown.Item href="/revenue/add">Add Revenues</NavDropdown.Item>
                    <NavDropdown.Item href="/revenue/view">View Revenues</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown 
                title={<span><FontAwesomeIcon icon={faCreditCard} /> Expenses</span>} 
                id="basic-nav-dropdown" className="navitem"
                >
                    <NavDropdown.Item href="/expense/add">Add Expenses</NavDropdown.Item>
                    <NavDropdown.Item href="/expense/view">View Expenses</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown 
                title={<span><FontAwesomeIcon icon={faFileInvoiceDollar} /> Invoices</span>} 
                id="basic-nav-dropdown" className="navitem"
                >
                    <NavDropdown.Item href="/invoice/add">Add Invoice</NavDropdown.Item>
                    <NavDropdown.Item href="/invoice/view">View Invoices</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown 
                title={<span><FontAwesomeIcon icon={faReceipt} /> Reciepts</span>} 
                id="basic-nav-dropdown" className="navitem"
                >
                    <NavDropdown.Item href="/reciept/add">Add Reciept</NavDropdown.Item>
                    <NavDropdown.Item href="/reciept/view">View Reciepts</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
        <Outlet />
    </>
  )
}

export default Topbar
