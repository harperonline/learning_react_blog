import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UpdatePost = ({
        posts, 
        handleUpdate, 
        updateBody, 
        setupdateBody,
        updateTitle,
        setupdateTitle
}) => {

    //get the data based on ID
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id); //stores the entire post


    useEffect(() => {
        if(post){
            setupdateTitle(post.title);
            setupdateBody(post.body);
        }
    }, [post, setupdateTitle, setupdateBody])


    return(
        <main className='NewPost'>
            {updateTitle &&
            <>
                <h2>Update Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault() }>
                    <label htmlFor="postTitle">Title</label>
                    <input 
                        id="postTitle"
                        type="text"
                        required
                        value={updateTitle}
                        onChange={(e) => setupdateTitle(e.target.value)}//on chnage update the state 

                        
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        required
                        value={updateBody}
                        onChange={(e) => setupdateBody(e.target.value)} 
                    />
                    <button type="submit" onClick={() => handleUpdate(post.id)}>Submit</button>
                </form>
            </>
        }
        {!updateTitle &&
            <>
            <h2>POST NOT FOUND</h2>
            <p><Link to='/'>Visit our homepage</Link></p>
            </>
        }
    </main>
    )

}
export default UpdatePost