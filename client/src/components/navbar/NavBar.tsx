import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaGlobe } from "react-icons/fa";

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#000000" }} variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#FFA500", fontWeight: "bold" }}>E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
          </Nav>

          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Buscar producto"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-warning">Buscar</Button>
          </Form>

          <Nav>
            <NavDropdown title={<FaGlobe />} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#es">Español</NavDropdown.Item>
              <NavDropdown.Item href="#en">English</NavDropdown.Item>
              <NavDropdown.Item href="#fr">Français</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                3
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
