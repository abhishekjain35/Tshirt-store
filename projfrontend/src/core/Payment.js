import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getAToken, processPayment } from "./helper/paymenthelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "./../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
    });
    return (
        <div>
            <h3>Tst bt</h3>
        </div>
    );
};

export default Payment;
