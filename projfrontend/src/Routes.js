import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './core/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
