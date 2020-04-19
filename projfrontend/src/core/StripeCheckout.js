import React from "react";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "./../backend";

const StripeCheckout = ({ products }) => {
    const getFinalPrice = () => {
        let amount = 0;
        if (products) {
            products.map((p) => {
                amount = amount + p.price;
                return;
            });
        }

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
                console.log("STATUS", status);
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
