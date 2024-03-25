import { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

function NavScroll({ search, setSearch }) {
  const [input, setInput] = useState("");
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ width: "100%" }}>
      <Container fluid>
        <Image src={require("../imgs/sportjiojio.png")} height={"60px"} roundedCircle className="p-2" />
        <Navbar.Brand href="/">Sport Jio Jio</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/">首頁</Nav.Link>
            <Nav.Link href="/createjiojio">發起揪團</Nav.Link>
            <Nav.Link href="/listjiojio">查看揪團</Nav.Link>
            {/* <Nav.Link href="/listgroup">所有社團</Nav.Link> */}
            <NavDropdown title="加入Sport JioJio" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">Line Bot</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Facebook</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action6">聯絡我們</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              contact: sportjiojio@gmail.com
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={input}
              onChange={(e) => {
                // console.log(e.target.value);
                setInput(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setSearch(input);
              }}
              variant="outline-secondary"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
