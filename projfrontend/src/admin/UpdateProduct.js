import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import {
    getCategories,
    getAProduct,
    updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match, history }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: "",
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        error,
        createdProduct,
        formData,
    } = values;

    useEffect(() => {
        const preload = async (productId) => {
            await getAProduct(productId).then(async (data) => {
                if (data.error) {
                    setValues({ error: data.error });
                } else {
                    const data1 = await getCategories();
                    if (data1.error) {
                        setValues({ error: data1.error });
                    } else {
                        console.log("HI");
                        categories.push(data1);
                        setValues({
                            ...values,
                            name: data.name,
                            description: data.description,
                            price: data.price,
                            category: data.category._id,
                            stock: data.stock,
                            formData: new FormData(),
                        });
                    }
                }
            });
        };

        preload(match.params.productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, match]);

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData).then(
            (data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        createdProduct: data.name,
                    });
                }
            }
        );
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>{createdProduct} updated SuccessFully</h4>
        </div>
    );

    const errorMessage = () => {
        if (error) {
            return (
                <div className="alert alert-warning mt-3">
                    <h4>Failed to create product</h4>
                </div>
            );
        }
    };

    const redirect = () => {
        if (createdProduct) {
            setTimeout(() => {
                return history.push("/admin/dashboard");
            }, 2000);
        }
    };

    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories[0] &&
                        categories[0].map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Update Product
            </button>
        </form>
    );

    return (
        <Base
            title="Update Product Here"
            description="Welcome to Update product section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {redirect()}
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
