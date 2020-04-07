import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import Base from "../core/Base";
import { getACategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        error: "",
        createdProduct: ""
    });

    const { name, error } = values;

    const preload = useCallback((categoryId) => {
        getACategory(categoryId).then((data) => {
            if (data.error) {
                setValues({ error: data.error });
            } else {
                // console.log(data);
                setValues({
                    name: data.name,
                    categoryId: data._id,
                });
            }
        });
    }, [])

    useEffect(() => {
        preload(match.params.categoryId);
    }, [preload, match]);

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "" });

        updateCategory(match.params.categoryId, user._id, token, {
            name: name,
        }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    createdProduct: data.name,
                });
            }
        });
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter new Category</p>
                <input
                    type="text"
                    autoFocus
                    required
                    className="form-control my-3"
                    onChange={handleChange("name")}
                    value={name}
                    placeholder="Enter new category, For ex. Summer"
                />
                <button onClick={onSubmit} className="btn bg-dark btn-success">
                    Update Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Update Category"
            description="Update category here"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            {categoryForm()}
        </Base>
    );
};

export default UpdateCategory;
