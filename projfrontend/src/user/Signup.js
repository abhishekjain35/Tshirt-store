import React, { useState } from "react";
import Base from "./../core/Base";
import { signup } from "./../auth/helper/index";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = input => event => {
        setValues({ ...values, error: false, [input]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in Signup"));
    };

    const SignupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                onChange={handleChange("name")}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                onChange={handleChange("email")}
                                className="form-control"
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                onChange={handleChange("password")}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <button className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };
    return (
        <Base title="Signup page" description="Feel free to signup!">
            {SignupForm()}
        </Base>
    );
};

export default Signup;
