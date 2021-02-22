function PostsList({posts}) {
    return (
        <div>
            <h2>List of posts:</h2>
            {
                posts.map(({title, text}) =>
                (<div key="post">
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>))
            }
        </div>
    );
}

export default PostsList;
