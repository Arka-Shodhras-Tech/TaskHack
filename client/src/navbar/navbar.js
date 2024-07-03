import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export const NavBar=()=> {
  return (
    <Navbar expand="lg" className="navbar" >
      <Container >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto" >
            <Nav.Link href="/exam" style={{color:'green'}}>Home</Nav.Link>
            <Nav.Link href="/exam/studentregister" style={{color:'green'}}>StudentRegistration</Nav.Link>
            <Nav.Link href="/exam/adminexam" style={{color:'green'}}>Exam</Nav.Link>
            <Nav.Link href="/exam/studentdata " style={{color:'green'}}>StudentData</Nav.Link>
            <Nav.Link href="/exam/192.5264.27" style={{color:'blue'}}>Student Exam</Nav.Link>
            <Nav.Link href="/exam/papercorrection" style={{color:'green'}}>PaperCorrection</Nav.Link>
            <Nav.Link href="/exam/studentscore" style={{color:'green'}}>StudentScore</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

