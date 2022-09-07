import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import UpdatePost from './UpdatePost';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts'; //use axoios to fetch the data
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [postTitle, setpostTitle] = useState('');
  const [postBody, setpostBody] = useState('');
  const [updateTitle, setupdateTitle] = useState('');
  const [updateBody, setupdateBody] = useState('');
  const history = useHistory();
  const { width } = useWindowSize(); //Why store ad an expression?
  //This will call the hook and populate the data
  const {data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  //READ all posts at load
  useEffect(()=> { 
    const fetchPosts = async() => {
      try{
        const response = await api.get('/posts');
        //axios means that you don't need to handle the resonse as with normal await.
        if(response && response.data) setPosts(response.data);
      } catch(err) {
        if(err.response) { //if err is defined
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else { //if err is not defined. 
          console.log(`Error: ${err.message}`);
        }
        
      }
    };
    //Now as this is an anonymous arrow function, we need to invoke it
    fetchPosts();
  }, []) //run at load time only


  useEffect(() => { //Remember that the array after [] contains things that when these change, it runs
    const filteredResults = posts.filter(post=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())

      || //define thes OR (short curcuit)

    ((post.title).toLowerCase()).includes(search.toLowerCase())
    )

  setsearchResults(filteredResults.reverse());
  }, [posts, search])


  //HANDLE UPDATE
  const handleUpdate = async(id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: updateTitle, datetime, body: updateBody };
    try{
      console.log("Trying update");
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post=> post.id === id ? { ...response.data } : post));
      setupdateTitle(''); //clear the title
      setupdateBody(''); //clear the body
      history.push('/');

    } catch(err){ //if err is not defined. 
      console.log(`Error: ${err.message}`);
    }
  }


  //ADD A NEW POST
  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1; //Get the last id in the array. if it's empty just set it to 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data]; //create a new array containg the old posts and add this new post to it. 
      setPosts(allPosts);
      setpostTitle('');
      setpostBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

  }

  const handleDelete = async (id) => {
    try{
      const postsList = posts.filter(wibble => wibble.id !== id);//look for a store the posts that are not the one we want
      await api.delete(`/posts/${id}`); //There is no response with a delete
      setPosts(postsList);
      history.push('/');//Push back to the / route
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="ReactJS Blog"
        width={width}
      />
      <Nav 
        search={search}
        setSearch={setSearch}
      />

      <Switch>

        <Route exact path = "/">
          <Home posts={searchResults}/>
        </Route>

        <Route exact path = "/post">
          <NewPost 
            handleSubmit={handleSubmit}//pass in the function
            postTitle={postTitle} //pass in the props
            setpostTitle={setpostTitle}
            postBody={postBody}
            setpostBody={setpostBody}
          />
        </Route>

        <Route path = "/edit/:id">
          <UpdatePost 
            posts={posts}
            handleUpdate={handleUpdate}//pass in the function
            updateTitle={updateTitle} //pass in the props
            setupdateTitle={setupdateTitle}
            updateBody={updateBody}
            setupdateBody={setupdateBody}
          />
        </Route>

        <Route path = "/post/:id">
          <PostPage 
            posts={posts}
            handleDelete={handleDelete}
          />
        </Route>

        <Route path = "/about" component={About} />
        <Route path = "/*" component={Missing} />

      </Switch>
     
     
      
      <Footer />
    </div>
  );
}

export default App;
