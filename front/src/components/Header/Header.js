import {Link} from "react-router-dom";
import PostCreate from "../../containers/Post/PostCreateContainer";
import React, {useContext} from "react";
import Register from "../Auth/Register";
import Login from "../../containers/Auth/LoginContainer";
import Logout from "../../containers/Auth/LogoutContainer";
import {CurrentUserContext} from "../../containers/RenderContainer";
import IsCheckAccessToken from '../../services/IsCheckAccessToken';

function Header() {
    const currentUser = useContext(CurrentUserContext);
    const pathImageStorage = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}\\uploads\\`;

    return (
        <header>
            <h2>Header</h2>
            <div className="flex">
                <span>Logo</span>
                {!currentUser &&
                <div>
                    <Register/>
                    &nbsp;/&nbsp;
                    <Login/>
                </div>}
                {currentUser &&
                <div>
                    <div>
                        <img
                            src={`${pathImageStorage}${currentUser.avatarLink}`}
                            alt='User avatar'
                        />
                        <span>{currentUser.name}</span>
                    </div>
                    <div>
                        <Logout/>
                    </div>
                </div>}
            </div>
            {currentUser && IsCheckAccessToken() &&
            <nav>
                <Link to={"/articles"} title="Home page, articles page">Articles</Link>
                <PostCreate/>
                <Link to={"/profile"} title="My profile">Profile</Link>
            </nav>}
        </header>
    )
}

export default Header;
