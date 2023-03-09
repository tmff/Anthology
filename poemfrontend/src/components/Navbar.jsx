import React from 'react';
import '../css/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function AnthNavbar() {
    return (
        <div className='nav'>
            <Navbar fixed='top'>
                <Container>
                    <Navbar.Brand href='/friends'>
                        <h1 className='app-title'>Anthology</h1>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default AnthNavbar;