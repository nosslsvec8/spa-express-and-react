import {Link} from "react-router-dom";
import PostCreate from "../../containers/PostCreateContainer";
import React from "react";
import Register from "../Auth/Register";
import Login from "../../containers/Auth/LoginContainer";

function Header() {
    return (
        <header>
            <h2>Header</h2>
            <div className="flex">
                <span>Logo</span>
                <div>
                    <Register/>
                    &nbsp;/&nbsp;
                    <Login/>
                </div>
            </div>
            <nav>
                <Link to={"/articles"} title="Home page, articles page">Articles</Link>
                <PostCreate/>
                <Link to={"/profile"} title="My profile">Profile</Link>
            </nav>
        </header>
    )
}

export default Header;
