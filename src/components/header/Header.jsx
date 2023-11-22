import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./header.css";
import headerlogo from "../../assets/Header_logo.svg";
import { useNavigate } from "react-router-dom";

function Header({activePage}) {
  const navigate = useNavigate();

  const handleNavItemClick = (page) => {
    navigate(page); 
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md">
      <Container style={{ width: "80%",height:"2.2rem"}}>
        <Navbar.Brand className="nav_brand">
          <img src={headerlogo} alt="Logo" className="header_logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Nav.Link
              className={activePage === "ImageSimilarity" ? "active-link" : "nav-link"}
              onClick={() => handleNavItemClick("/image-similarity")}
            >
              Image Similarity
            </Nav.Link>
            <Nav.Link
              className={activePage === "AutoLocationRecognizer" ? "active-link" : "nav-link"}
              onClick={() => handleNavItemClick("/auto-lr")}
            >
              Auto Location Recognizer
            </Nav.Link>
            <Nav.Link
              className={activePage === "GeoLocationTagger" ? "active-link" : "nav-link"}
              onClick={() => handleNavItemClick("/geo-lt")}
            >
              Geo Location Tagger
            </Nav.Link>
            <Nav.Link
              className={activePage === "Dashboard" ? "active-link" : "nav-link"}
              onClick={() => handleNavItemClick("/")}
            >
              Q&A
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
