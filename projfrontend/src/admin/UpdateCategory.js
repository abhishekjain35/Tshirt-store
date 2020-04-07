import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import Base from "../core/Base";
import { updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match, history }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        error: "",
        updatedCategory: "",
    });

    const { name, error, updatedCategory } = values;

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
                    updatedCategory: data.name,
                });
            }
        });
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedCategory ? "" : "none" }}
        >
            <h4>{updatedCategory} updated SuccessFully</h4>
        </div>
    );

    const errorMessage = () => {
        if (error) {
            return (
                <div className="alert alert-warning mt-3">
                    <h4>Failed to update category</h4>
                </div>
            );
        }
    };

    const redirect = () => {
        if (updatedCategory || error) {
            setTimeout(() => {
                return history.push("/admin/dashboard");
            }, 2000);
        }
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <h3>Enter new Category</h3>
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
            {redirect()}
            {errorMessage()}
            {successMessage()}
            {categoryForm()}
        </Base>
    );
};

export default UpdateCategory;
