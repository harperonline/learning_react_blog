
const NewPost = ({
    handleSubmit, postTitle, setpostTitle, postBody, setpostBody
}) => {
    return(
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title</label>
                <input 
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setpostTitle(e.target.value)}//on chnage update the state 

                    
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setpostBody(e.target.value)} 
                />
                <button type="submit">Submit</button>


            </form>
        </main>
    )

}
export default NewPost