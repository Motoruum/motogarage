import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [scales, setScales] = useState([]);

  useEffect(() => {
    fetchScales();
  }, []);

  const fetchScales = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/stock/scales');
      if (response.ok) {
        const data = await response.json();
        setScales(data);
      }
    } catch (error) {
      console.error('Error fetching scales:', error);
    }
  };

  const getScaleDisplayName = (scale) => {
    const scaleNames = {
      '1:6': '1:6 (Büyük)',
      '1:9': '1:9 (Orta)',
      '1:10': '1:10 (Orta)',
      '1:12': '1:12 (Orta)',
      '1:18': '1:18 (Standart)',
      '1:24': '1:24 (Küçük)',
      '1:32': '1:32 (Çok Küçük)'
    };
    return scaleNames[scale] || scale;
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🏍️ MotoGarage Stock Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              Tüm Stok
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/add" 
              active={location.pathname === '/add'}
            >
              Yeni Ürün Ekle
            </Nav.Link>
            
            <NavDropdown title="Ölçek Bazlı Görünüm" id="scale-dropdown">
              {scales.map((scale) => (
                <NavDropdown.Item 
                  key={scale} 
                  as={Link} 
                  to={`/scale/${scale}`}
                  active={location.pathname === `/scale/${scale}`}
                >
                  {getScaleDisplayName(scale)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
