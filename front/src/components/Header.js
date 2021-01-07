function Header({updateActive}) {
    return (
        <header>
            <h2>Header</h2>
            <button onClick={updateActiveArticles => updateActive('articles')}>Articles</button>
            <button onClick={updateActiveAddArticle => updateActive('articleAdd')}>Add article</button>
            <button onClick={updateActiveProfile => updateActive('profile')}>Profile</button>
        </header>
    )
}

export default Header;
