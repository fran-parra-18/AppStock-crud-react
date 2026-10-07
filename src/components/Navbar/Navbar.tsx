import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">App Stock</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Productos</Nav.Link>
          <Nav.Link as={NavLink} to="/create">Agregar</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
