import './detailPost.css';
import {Navigate, Link} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import axios from 'axios';

const DetailPost = function({idPost}){
    // state
    const [edit, setEdit] = useState(false);

    const [post, setPost] = useState(null);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        getPost();
    }, [edit]);

    const getPost = async () => {
        const result = await axios.get(`/post/${idPost}`);
        const data = result.data;
        if(data.success && data.message) setPost(data.message);
    }

    // console.log(post);

    // use context 
    const {authState} = useContext(AuthContext);
    const {user} = authState;

    // if not exist user then navigate to login page
    if(!user) return <Navigate to='/login' />;

    // function handle event
    const toggleEdit = () => setEdit(prevState => !prevState);

    const handleDelete = async () => {
        const isDelete = window.confirm('Are you sure to delete this post?');
        if(isDelete){
            const result = await axios.delete('/post/' + post.id);
            const data = result.data;
            if(data.success){
                setRedirect('/');
            }else{
                console.log(data.message);
            }
        }
    }

    const handleEdit = async () => {
        const newPost = post;
        if(post.file){
            const formData = new FormData();
            const fileName = 'post-' + Date.now() + post.file.name;
            formData.append('name', fileName);
            formData.append('file', post.file);
            newPost.image = fileName;
            await axios.post('/upload', formData);
        }
        const result = await axios.put(`/post`, newPost);
        const data = result.data;
        console.log(data.success);
        if(data.success) toggleEdit();
    };
    
    const onChangeFormEdit = (event) => {
        if(event.target.name == 'image'){
            setPost({
                ...post,
                file: event.target.files[0]
            })
        }else{
            setPost({
                ...post,
                [event.target.name]: event.target.value
            })
        }
    };

    // if exist user render detail page
    if(redirect) return <Navigate to={redirect} />;
    return (
        <div className="detailPost">
            <div className="detailImgGroup">
                <img className="detailImg"
                    src={
                        post && post.file ? (URL.createObjectURL(post.file)) 
                        : post && '/images/' + post.image}
                    alt="" 
                />
                {
                edit && <div className="detailImgInput">
                            <label htmlFor="image" className="labelImgInput">Choose image</label>
                            <input 
                                id="image" 
                                type="file" 
                                name="image" 
                                hidden
                                onChange={onChangeFormEdit}
                                />
                        </div>
                }
            </div>
            <div className="detailHeader">
                {
                    edit ? <input 
                            type="text" 
                            name="title" 
                            className="inputEdit" 
                            placeholder="Enter your blog's title" 
                            value={post.title}
                            onChange={onChangeFormEdit}
                            />
                    : <>
                        <h2 className="detailTitle">
                            {post && post.title}
                        </h2>
                        <div className="detailEdit">
                            <i className="fa-solid fa-pen-to-square detailIcon"
                                onClick={toggleEdit}></i>
                            <i className="fa-solid fa-trash-can detailIcon"
                                onClick={handleDelete}></i>
                        </div>
                    </>
                }
            </div>
            <div className="detailInfo">
                <span className="detailAuthor">
                    Author: 
                    {
                    post ? <Link className="link" to={'/posts?username=' + post.username}>
                        <span className="text-bold">{post && post.username}</span>
                    </Link> 
                    : ''
                    }
                </span>
                <span className="detailCreatedAt">{post && post.createdAt}</span>
            </div>
            {
                edit ? <textarea 
                        className="inputEdit"
                        name="desciption"
                        onChange={onChangeFormEdit}>{post.desciption}</textarea>
                : <div className="detailDesc">
                    {post && post.desciption}
                </div>
            } 
            {
                edit ? <div className="btnGroupEdit">
                        <button 
                        className="btn btn-cancel"
                        onClick={toggleEdit}>Cancel</button>
                        <button
                        className="btn btn-save"
                        onClick={handleEdit}>Save</button>
                    </div>
                : false
            }  
        </div>
    )
}

export default DetailPost;