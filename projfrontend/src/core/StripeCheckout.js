import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./../auth/helper/index";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

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

    return (
        <div>
            <h3 className="text-white">{getFinalPrice()}</h3>
        </div>
    );
};

export default StripeCheckout;
