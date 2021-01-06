import React, {Component} from 'react';
import Header from "./Header";
import './Header.css';
import Footer from "./Footer";
import Articles from "./Articles";
import ArticleAdd from "./ArticleAdd";
import Profile from "./Profile";

export default class Render extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: true,
            articleAdd: false,
            profile: false
        };
    }

    activeArticles = () => {
        this.setState({
            articles: true,
            articleAdd: false,
            profile: false,
        })
    };

    activeArticleAdd = () => {
        this.setState({
            articles: false,
            articleAdd: true,
            profile: false,
        })
    };

    activeProfile = () => {
        this.setState({
            articles: false,
            articleAdd: false,
            profile: true,
        })
    };

    render() {
        return (
            <div>
                <Header
                    activeArticles={this.activeArticles}
                    activeArticleAdd={this.activeArticleAdd}
                    activeProfile={this.activeProfile}
                />
                <main>
                    {this.state.articles && <Articles/>}
                    {this.state.articleAdd && <ArticleAdd/>}
                    {this.state.profile && <Profile/>}
                </main>
                <Footer/>
            </div>
        );
    }
}
