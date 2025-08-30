import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Tienda</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">Productos</Nav.Link>
          <Nav.Link as={Link} to="/create">Agregar nuevo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
