import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./../auth/helper/index";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "./../backend";
import { createOrder } from "./helper/OrderHelper";

const StripeCheckout = ({
    products,
    setReload = (f) => f,
    reload = undefined,
}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: "",
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map((p) => {
            amount = amount + p.price;
        });
        return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        return fetch(`${API}/stripePayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((res) => {
                console.log(res);
                const { status } = res;
                console.log("STATUS", status)
            })
            .catch((err) => console.log(err));
    };

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_hDeDJmlhkiE2Px71pMXkYGqB00UyI6QzWE"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy T-shirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        );
    };

    return (
        <div>
            <h3 className="text-white">{getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;
