import React, { useState } from "react";
import Base from "./../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "./../auth/helper/index";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = input => event => {
        setValues({ ...values, error: false, [input]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(console.log("signin failed"));
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        Account Created Successfully. Please{" "}
                        <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const SigninForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                onChange={handleChange("email")}
                                value={email}
                                className="form-control"
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                onChange={handleChange("password")}
                                value={password}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <button
                            onClick={onSubmit}
                            className="btn btn-success btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };
    return (
        <Base title="Signin page" description="Feel free to Signin!">
            {SigninForm()}
        </Base>
    );
};

export default Signin;
