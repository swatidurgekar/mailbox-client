import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">MyWebLink</Navbar.Brand>
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Products</Nav.Link>
        <Nav.Link>About Us</Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
