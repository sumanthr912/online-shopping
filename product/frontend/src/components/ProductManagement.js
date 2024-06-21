import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [editedProduct, setEditedProduct] = useState({ id: '', name: '', description: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async () => {
        try {
            await axios.post('http://localhost:8080/api/products', newProduct);
            fetchProducts();
            setNewProduct({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async () => {
        try {
            await axios.put(`http://localhost:8080/api/products/${editedProduct.id}`, editedProduct);
            fetchProducts();
            setEditedProduct({ id: '', name: '', description: '', price: '' });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-management">
            <h2>Product Management</h2>
            <div className="add-product">
                <h3>Add Product</h3>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Product Description"
                />
                <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Product Price"
                />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="update-product">
                <h3>Update Product</h3>
                <select value={editedProduct.id} onChange={(e) => setEditedProduct({ ...editedProduct, id: e.target.value })}>
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                {editedProduct.id && (
                    <div>
                        <input
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                            placeholder="Product Description"
                        />
                        <input
                            type="text"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                            placeholder="Product Price"
                        />
                        <button onClick={updateProduct}>Update Product</button>
                    </div>
                )}
            </div>

            <div className="products">
                <h3>Products</h3>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.description} - ${product.price}
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductManagement;
