import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import './CustomNavbar.css'

function CustomNavbar() {

    const [expanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState("React Weather")
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setCurrentPage("Current Weather")
                break
            case "/forecast":
                setCurrentPage("5-Day Forecast")
                break
            case "/rainmap":
                setCurrentPage("Precipitation Map")
                break
            default:
                setCurrentPage("React Weather")
        }
    }, [])

    const handleClick = (page) => {
        setExpanded(false)
        setCurrentPage(page)
    }

    return (
        <Container>
            <Row className='my-4'>
                <Col className='text-center'>
                    <h1>React Weather</h1>
                </Col>
            </Row>
            <Container className="nav-container">
                <Navbar expand="md" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
                    <Navbar.Brand className="d-md-none">{currentPage}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav variant="underline" defaultActiveKey="./CurrentWeather.jsx">
                            <Nav.Item>
                                <Nav.Link
                                    as={NavLink}
                                    to="/"
                                    onClick={() => handleClick("Current Weather")}
                                >
                                    Current Weather
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={NavLink}
                                    to="/forecast"
                                    onClick={() => handleClick("5-Day Forecast")}
                                >
                                    5-Day Forecast
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={NavLink}
                                    to="/rainmap"
                                    onClick={() => handleClick("Precipitation Map")}
                                >
                                    Precipitation Map
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </Container>
    );
}

export default CustomNavbar;