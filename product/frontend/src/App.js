// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProductManagement from './components/ProductManagement';
import './styles.css';
import NavBar from './components/NavBar'; 

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();

        return () => {
            // Cleanup tasks (if any)
        };
    }, []);

    return (
        <Router>
            <NavBar />
                <Routes>
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/" element={<HomePage products={products} />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
        </Router>
    );
}

export default App;
