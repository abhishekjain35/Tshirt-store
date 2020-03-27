import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
    const [name, setName] = useState("initialState");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input
                    type="text"
                    autoFocus
                    required
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    placeholder="For ex. Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Create a category here"
            description="Add categories for tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
