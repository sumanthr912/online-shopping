import React, { useState } from 'react';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    // Function to calculate the total price of items in the cart
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.name} - ${item.price}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${calculateTotalPrice()}</p>
                    {/* Add checkout button and other functionality as needed */}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartPage;
