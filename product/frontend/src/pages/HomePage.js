import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
    // Define state to store the fetched products
    const [products, setProducts] = useState([]);

    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Define a function to fetch product data from the backend API
        const fetchProducts = async () => {
            try {
                // Make a GET request to fetch product data from the backend API
                const response = await axios.get('http://localhost:8080/api/products');

                // Set the fetched product data in the component state
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchProducts function when the component mounts
        fetchProducts();

        // Cleanup function (optional)
        return () => {
            // Perform cleanup tasks if necessary (e.g., canceling pending requests)
        };
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    // Render the fetched product data in the UI
    return (
        <div>
            <h1>Products</h1>
            <ul>
                {/* Map over the products array and render each product */}
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
