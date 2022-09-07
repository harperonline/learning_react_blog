import { useParams, Link } from "react-router-dom"
const PostPage = ({posts, handleDelete, handleUpdate}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    
    return (
        <main className="PostPage">
            <article className="post">
                {post && 
                    <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postDate">{post.body}</p>
                    <Link to={`/edit/${post.id}`}>
                    <button className="editButton" onClick={() => handleUpdate(post.id)}>
                        Edit Post
                    </button> 
                    </Link>
                    <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                    </>
                }
                {!post &&
                //HTML Fragment <>
                    <>
                    <h2>Post not found</h2>
                    <p>Well, that's dissapointing</p>
                    <p>
                        <Link to='/'>Visit our homepage</Link>
                    </p>
                    </>

                }
            </article>
            
        </main>
    )

}
export default PostPage