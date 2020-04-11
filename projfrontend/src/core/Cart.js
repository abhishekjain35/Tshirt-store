import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
    const [products, setProducts] = useState([]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This Section it to load all products</h2>
            </div>
        );
    };
    const loadCheckout = () => {
        return (
            <div>
                <h2>This Section is for checkout</h2>
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    );
};

export default Cart;
