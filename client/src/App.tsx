import { Container, Nav, Navbar } from 'react-bootstrap';
import Navigation from './app/routes';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Amazone</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/cart" className="nav-link">
              Sign in
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Navigation />
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
