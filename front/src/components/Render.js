import React from 'react';
import Header from "./Header";
import './Header.css';
import Footer from "./Footer";
import Articles from "./Articles";
import ArticleAdd from "./ArticleAdd";
import Profile from "./Profile";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import IsUrlDateNotLaterCurrent from "./IsUrlDateNotLaterCurrent";

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

                <Route exact path="/users">
                    /users
                </Route>
                <Route exact path="/users/(\d+)">
                    /users/(\d+)
                </Route>
                <Route exact path="/users/(\d+)">
                    /users/:id
                </Route>
                <Route exact path="/users/(\d+)/edit">
                    /users/:id/edit
                </Route>
                <Route exact path="/users/(\d+)/avatar">
                    /users/:id/avatar
                </Route>
                <Route exact path="/users/(\d+)/avatar/edit">
                    /users/:id/avatar/edit
                </Route>
                <Route exact path="/users/(\d+)/avatar/delete">
                    /users/:id/avatar/delete
                </Route>

                <Route exact
                     path="/users/(\d+)/file/(\d+)-(\w{1,10})-(\d{4})-(0[0-9]|[1][0-2])-([0-2][0-9]|3[0-1]).(docx|jpeg|pdf|txt)/v.(\d{1}).(\d{1}).(\d{1})"
                >
                    {(IsUrlDateNotLaterCurrent()) ? '/users/1/file/XXX-YYY-2020-01-20.FFF/v.Z.Z.Z' : <Redirect to="/articles"/>}
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
