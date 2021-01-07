import React, {useState} from 'react';
import Header from "./Header";
import './Header.css';
import Footer from "./Footer";
import Articles from "./Articles";
import ArticleAdd from "./ArticleAdd";
import Profile from "./Profile";

function Render() {
    const [articles, setArticles] = useState(1);
    const [articleAdd, setArticleAdd] = useState(0);
    const [profile, setProfile] = useState(0);

    const activeArticles = () => {
        setArticles(1);
        setArticleAdd(0);
        setProfile(0);
    };

    const activeArticleAdd = () => {
        setArticles(0);
        setArticleAdd(1);
        setProfile(0);
    };

    const activeProfile = () => {
        setArticles(0);
        setArticleAdd(0);
        setProfile(1);
    };

    return (
        <div>
            <Header
                activeArticles={activeArticles}
                activeArticleAdd={activeArticleAdd}
                activeProfile={activeProfile}
            />
            <main>
                {articles > 0 && <Articles/>}
                {articleAdd > 0 && <ArticleAdd/>}
                {profile > 0 && <Profile/>}
            </main>
            <Footer/>
        </div>
    );
}

export default Render;
