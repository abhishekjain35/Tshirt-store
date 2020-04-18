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
        instance: {},
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getAToken(userId, token).then((res) => {
            if (res.error) {
                setInfo({ ...info, error: res.error });
            } else {
                const clientToken = res.clientToken;
                setInfo({ clientToken });
            }
        });
    };

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then((data) => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount(),
                };
                processPayment(userId, token, paymentData)
                    .then((res) => {
                        setInfo({
                            ...info,
                            success: res.success,
                            loading: false,
                         });
                    })
                    .catch((err) => {
                        setInfo({ loading: false, success: false });
                    });
            })
    };

    const showBtDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) =>
                                (info.instance = instance)
                            }
                        />
                        <button
                            className="btn btn-block btn-success"
                            onClick={onPurchase}
                        >
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>Please Login or Add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

   

    const getAmount = () => {
        let amount = 0;
        products.map((p) => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your Bill is {getAmount()} $</h3>
            {showBtDropIn()}
        </div>
    );
};

export default Payment;
