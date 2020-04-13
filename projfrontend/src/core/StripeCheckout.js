import React, {useEffect, useState} from "react";
import { isAuthenticated } from './../auth/helper/index';
import { emptyCart, loadCart } from "./helper/cartHelper";
import { Link } from 'react-router-dom';

const StripeCheckout = ({products, setReload = f => f, reload=undefined}) => {
    return (
        <div>
            <h3 className="text-white">Stripe Checkout</h3>
        </div>
    );
};

export default StripeCheckout;
