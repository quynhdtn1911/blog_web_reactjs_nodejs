import './write.css';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';

const Write = function(){
    // state
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState(null);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try{
            const result = await axios.get('/categories');
            const data = result.data;
            if(data.success) setCategories(data.message);
            else console.log(data.message);
        }catch(err){
            console.log(err);
        }
    }

    // use context
    const {authState} = useContext(AuthContext);
    const {user} = authState;
    if(!user) return <Navigate to='/login' />;

    const onChangeForm = (event) => {
        if(event.target.name == 'image'){
            const file = event.target.files[0];
            setPost({
                ...post,
                file
            });
        }else {
            setPost({
                ...post,
                [event.target.name]: event.target.value
            })
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const newPost = post;
        if(post.file){
            // const formData = new FormData();
            const fileName = 'post-' + Date.now() + post.file.name;
            // formData.append('name', fileName);
            // formData.append('file', post.file);
            // await axios.post('/upload', formData);
            newPost.image = fileName; 
        }else newPost.image = 'default-post.jpg';
        newPost.idUser = user.id;
        const result = await axios.post('/post/store', newPost);
        const data = result.data;
        if(!data.success) console.log(data.message);
        else{
            console.log(data.message);
            newPost.id = data.message;
            setRedirect('/post/detail/' + newPost.id);
        }
    }

    if(redirect) return <Navigate to={redirect} />;
    return (
        <div className="write">
            <div className="writeContainer">
                <div className="writeImgGroup">
                    <img src={post && post.file ? URL.createObjectURL(post.file) : '/images/default-post.jpg'}
                        alt="" 
                        className="writeImg"
                    />
                    <div className="writeImgInput">
                        <label className="btn labelImgInput" htmlFor="image">Choose image</label>
                        <input 
                            type="file" 
                            name="image" 
                            id="image" 
                            hidden
                            onChange={onChangeForm}
                            />
                    </div>
                </div>
                <form action="" className="writeForm" onSubmit={onSubmit}>
                    <input 
                        className="writeInput writeInputTitle" 
                        type="text" 
                        name="title" 
                        placeholder="Enter your post title"
                        value={post && post.title} 
                        onChange={onChangeForm}
                        />
                    {
                        categories && <select 
                                        name="idCategory" 
                                        className="writeInput writeInputCategory"
                                        required
                                        onChange={onChangeForm}
                                    >
                                        <option value="">---Choose category---</option>
                                        {
                                            categories.map((category) => 
                                                <option 
                                                    key={category.id} 
                                                    value={category.id}
                                                >{category.name}</option>
                                            )
                                        }
                                    </select>
                    }
                    <textarea 
                        className="writeInput writeInputDesc" 
                        name="desciption" 
                        id="" 
                        cols="30" 
                        rows="10"
                        onChange={onChangeForm}>{post && post.desciption ? post.desciption : 'Tell me your story...'}</textarea>
                    <input type="submit" value="Publish" className="btn writeBtn" />
                </form>
            </div>
        </div>
    )
}

export default Write;