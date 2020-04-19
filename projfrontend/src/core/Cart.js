import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Payment from "./Payment";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>This Section it to load all products</h2>
                {products && products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products ? (
                        loadAllProducts(products)
                    ) : (
                        <h3>No Products in cart</h3>
                    )}
                </div>
                <div className="col-6">
                    <StripeCheckout products={products} setReload={setReload} />
                    <Payment products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    );
};

export default Cart;
