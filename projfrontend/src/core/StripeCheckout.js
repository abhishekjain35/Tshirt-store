import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./../auth/helper/index";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";

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

    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey=""
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
