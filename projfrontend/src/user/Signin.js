import React, { useState } from "react";
import Base from "./../core/Base";

const Signin = () => {
    const SigninForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" />
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
        <Base title="Signin page" description="Feel free to Signin!">
            {SigninForm()}
        </Base>
    );
};

export default Signin;
