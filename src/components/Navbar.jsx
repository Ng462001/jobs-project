<<<<<<< HEAD
// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        Cookies.remove("jwt-token");
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container container ">
                <div className="navbar-brand ">
                    <NavLink to="/" className="brand-link">
                        <img className="brand-logo" src="/images/logo.png" alt="website logo" />
                    </NavLink>
                </div>

                <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="nav-link-text">Home</span>
                                <span className="nav-link-indicator"></span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/jobs"
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="nav-link-text">Jobs</span>
                                <span className="nav-link-indicator"></span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-actions">

                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
=======
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import '../css/navbar.css'
import Button from '../AnimatedComponents/Button'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("jwt-token")
        navigate("/login")
    }

    return (
        <nav className='w-100 px-5 py-2 navbar top-0 sticky-top '>
            <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                    <NavLink to="/"><img className="imageLogo" src="/images/logo.png" alt="website logo" /></NavLink>
                </div>
                <div>
                    <ul className='d-flex list-unstyled gap-4 mt-3'>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? " text-decoration-none fw-bold active" : "text-dark text-decoration-none fw-bold"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-decoration-none fw-bold active" : "text-dark text-decoration-none fw-bold"}>Jobs</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <Button onclick={handleLogout} text="Logout" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
>>>>>>> 87b7e8a50e4a3eba55dbea518447bff41b837971
