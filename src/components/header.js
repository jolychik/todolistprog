import React, {Component} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import logo from './logo192.png'
import {type} from "@testing-library/user-event/dist/type";
import '../index.css'
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

import HomePage from '../pages/home';
import GoalPage from '../pages/goals';
import ProjectPage from '../pages/projects';
import UserPage from '../pages/users';
import StakePage from '../pages/stake';
import Login from '../pages/Login';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar sticky={"top"} collapseOnSelect={true} collapse expand={"md"} bg={"dark"} variant={"dark"}>
                    <Container>
                        {/*<Navbar.Brand href={"/"}>
                            <img
                            src={logo}
                            height={"30"}
                            width={"30"}
                            className={"d-inline-block align-top"}
                            alt={"logo"}
                            />
                        </Navbar.Brand>*/}
                        <Navbar.Toggle aria-controls={"responsive-navbar-nav"}/>
                        <Navbar.Collapse id={"responsive-navbar-nav"}>
                            <Nav className={"me-auto"}>
                                <Nav.Link href={"/"}>Dashboard</Nav.Link>
                                <Nav.Link href={"/projects"}>Projects</Nav.Link>
                                <Nav.Link href={"/users"}>Users</Nav.Link>
                                <Nav.Link href={"/goals"}>Goals</Nav.Link>
                                <Nav.Link href={"/stakeholders"}>Stakeholders</Nav.Link>
                                <Nav.Link href={"/login"}>Login</Nav.Link>
                            </Nav>
                            {/*<Form inline className={"d-flex"}>
                                <FormControl
                                    type={"text"}
                                    placeholder={"Search"}
                                    className={"me-2"}
                                />
                                <Button variant={"outline-info"}>Search</Button>
                            </Form>*/}

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/projects" element={<ProjectPage/>}/>
                        <Route exact path="/users" element={<UserPage/>}/>
                        <Route exact="" path={"/goals"} element={<GoalPage/>}/>
                        <Route exact="" path={"/stakeholders"} element={<StakePage/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default Header;