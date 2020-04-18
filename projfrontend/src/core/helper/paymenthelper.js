import { API } from "./../../backend";

export const getAToken = (userId, token) => {
    return fetch(`${API}/payment/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentInfo),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};
