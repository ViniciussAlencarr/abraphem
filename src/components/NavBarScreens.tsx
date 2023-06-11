import { Container, Navbar,  Nav, NavDropdown } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './NavBarScreens.css'

export const NavBarScreen = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Link className='navbar-brand' to="/">Logo</Link>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/">Inicio</Link>
                        <Link to="/request">Nova solicitação</Link>
                        <Link to="/">Minhas solicitações</Link>
                    </Nav>
                    <div className='user-options'>
                        <FaUserCircle size={40} />
                        <NavDropdown title="Nome do usuário" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link to="/login">Sair</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
