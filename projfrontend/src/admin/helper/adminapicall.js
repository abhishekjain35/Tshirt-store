import { API } from "./../../backend";

export const createCategory = (userId, token, categoryName) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryName),
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const getACategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const getAProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}