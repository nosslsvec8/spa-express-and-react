import {Link} from "react-router-dom";
import PostCreate from "../../containers/PostCreateContainer";
import React from "react";
import Typography from "@material-ui/core/Typography";

function Header() {
    return (
        <header>
            <h2>Header</h2>
            <nav>
                <Link to={"/articles"}>Articles</Link>
                <PostCreate />
                <Link to={"/profile"}>Profile</Link>
            </nav>
        </header>
    )
}

export default Header;
