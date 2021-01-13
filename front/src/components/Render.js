import React, {useState} from 'react';
import Header from "./Header";
import './Header.css';
import Footer from "./Footer";
import Articles from "./Articles";
import ArticleAdd from "./ArticleAdd";
import Profile from "./Profile";
import ErrorBoundary from "./ErrorBoundary";

function Render() {
    const [articles, setArticles] = useState(1);
    const [articleAdd, setArticleAdd] = useState(0);
    const [profile, setProfile] = useState(0);

    const updateActive = (key) => {
        resetActive();

        switch (key) {
            case 'articles':
                setArticles(1);
                break;
            case 'articleAdd':
                setArticleAdd(1);
                break;
            case 'profile':
                setProfile(1);
                break;
            default:
                setArticles(1);
        }
    };

    const resetActive = () => {
        setArticles(0);
        setArticleAdd(0);
        setProfile(0);
    };

    return (
        <div>
            <Header updateActive={updateActive}/>
            <main>
                <ErrorBoundary>
                    {articles > 0 && <Articles/>}
                    {articleAdd > 0 && <ArticleAdd/>}
                    {profile > 0 && <Profile/>}
                </ErrorBoundary>
            </main>
            <Footer/>
        </div>
    );
}

export default Render;
