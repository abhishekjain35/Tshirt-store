import React from "react";
import Menu from "./Menu";

const Base = ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white",
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center mb-0">
                    <h3 className="display-4">{title}</h3>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg">
                        Contact Us
                    </button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing <span className="text-white">MERN </span>
                        bootcamp
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Base;
