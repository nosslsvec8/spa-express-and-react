import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <header>
                <h2>Header</h2>
                <button onClick={() => { this.props.activeArticles()}}>Articles</button>
                <button onClick={() => { this.props.activeArticleAdd()}}>Add article</button>
                <button onClick={() => { this.props.activeProfile()}}>Profile</button>
            </header>
        )
    }
}
