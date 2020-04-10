import React from "react";
import "../styles.css";
import Base from "./Base";
import Card from './Card';

const Home = () => {
    return (
        <Base title="Home Page" description="Welcome to the Tshirt store">
            <div className="row text-center">
                <div className="col-4">
                    <Card />
                </div>
                <div className="col-4"></div>
                <div className="col-4"></div>
            </div>
        </Base>
    );
};

export default Home;
