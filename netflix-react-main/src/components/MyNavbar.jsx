import { Component } from "react";
import { Navbar, Nav, InputGroup, FormControl, Form } from "react-bootstrap";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { useState } from "react";

const MyNavbar =(props)=> {

const [SearchString, setSearchString] = useState("")

  // state = {
  //   searchString: "",
  // };

  const searchStringHandler = (e) => {
    if (e.keyCode === 13) {
      // WHEN ENTER KEY IS PRESSED

      props.showSearchResult(SearchString)
      // this.props.showSearchResult(this.state.searchString);
    } else {
      
      setSearchString({SearchString: e.currentTarget.value})
      // this.setState({ searchString: e.currentTarget.value });
    }
  };

 
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
        <Navbar.Brand href="/">
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active className="font-weight-bold" href="/">
              Home
            </Nav.Link>
<Link to="/TVShow">
            <div className="font-weight-bold" >
              TV Shows
            </div>
</Link>

            <Nav.Link className="font-weight-bold" href="/">
              Movies
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Recently Added
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              My List
            </Nav.Link>
          </Nav>
          <span className="d-flex align-items-center">
            <InputGroup className="icons">
              <FormControl
                placeholder="Search and press enter"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyDown={this.searchStringHandler}
                onChange={this.searchStringHandler}
                value={this.state.searchString}
              />
            </InputGroup>
            <div id="kids">KIDS</div>
            <i className="fa fa-bell icons"></i>
            <i className="fa fa-user icons"></i>
          </span>
        </Navbar.Collapse>
      </Navbar>
    );
  
}

export default MyNavbar;
