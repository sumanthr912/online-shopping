import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

        return () => {
            // Cleanup tasks (if any)
        };
    }, [id]);

    return (
        <div>
            <h2>Product Details</h2>
            {product ? (
                <div>
                    <p>Name: {product.name}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    {/* Add more product details if needed */}
                </div>
            ) : (
                <p>Loading product...</p>
            )}
        </div>
    );
}

export default ProductPage;
