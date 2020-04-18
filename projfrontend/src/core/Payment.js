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
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getAToken(userId, token).then(res => {
            if(res.error){
                setInfo({...info, error: res.error})
            }
            else{
                const clientToken = res.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showBtDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button onClick={() => {}}>Buy</button>
                  </div>
                ) : (<h3>Please Login or Add something to cart</h3>)}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token)
    }, []);

    return (
        <div>
            <h3>Test bt</h3>
            {showBtDropIn()}
        </div>
    );
};

export default Payment;
