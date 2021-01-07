function Header({activeArticles, activeArticleAdd, activeProfile}) {
    return (
        <header>
            <h2>Header</h2>
            <button onClick={() => {activeArticles()}}>Articles</button>
            <button onClick={() => {activeArticleAdd()}}>Add article</button>
            <button onClick={() => {activeProfile()}}>Profile</button>
        </header>
    )
}

export default Header;
