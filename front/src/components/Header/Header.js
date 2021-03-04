import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <h2>Header</h2>
            <nav>
                <Link to={"/articles"}>Articles</Link>
                <Link to={"/new-article"}>Add article</Link>
                <Link to={"/profile"}>Profile</Link>
            </nav>
        </header>
    )
}

export default Header;
