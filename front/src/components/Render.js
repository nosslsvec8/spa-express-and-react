import React from 'react';
import Header from "./Header";
import './Header.css';
import Footer from "./Footer";
import Articles from "./Articles";
import ArticleAdd from "./ArticleAdd";
import Profile from "./Profile";
import User from "./User";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function Render() {
    return (
        <BrowserRouter>
            <Header/>

            <Switch>
                <Route exact path="/articles">
                    <Articles/>
                </Route>
                <Route exact path="/articleAdd">
                    <ArticleAdd/>
                </Route>
                <Route exact path="/profile">
                    <Profile/>
                </Route>

                <Route exact path={[
                    "/users",
                    "/users/(\\d+)",
                    "/users/(\\d+)/edit",
                    "/users/(\\d+)/avatar",
                    "/users/(\\d+)/avatar/edit",
                    "/users/(\\d+)/avatar/delete",
                    "/users/(\\d+)/file/(\\d+)-(\\w{1,10})-(\\d{4})-(0[0-9]|[1][0-2])-([0-2][0-9]|3[0-1]).(docx|jpeg|pdf|txt)/v.(\\d{1}).(\\d{1}).(\\d{1})",
                ]}>
                    <User/>
                </Route>

                <Redirect from="/" to="/articles"/>
                <Route exact path="**">
                    <Articles/>
                </Route>
            </Switch>

            <Footer/>
        </BrowserRouter>
    );
}

export default Render;
