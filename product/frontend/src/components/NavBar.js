import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/products">Products</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart">View Cart</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
