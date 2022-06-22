import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Posts from '../../components/posts/Posts';
import './home.css';
import {Navigate, useLocation} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const Home = function(){
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getPosts();
        return () => setPosts(null);
    }, [location]);


    const getPosts = async () => {
        const search = location.search || '';
        const result = await axios.get('/posts' + search);
        const data = result.data;
        if(data.success && data.message) setPosts(data.message);
    };
    
    const {authState} = useContext(AuthContext);

    if(!authState.user) return <Navigate to='/login' />; 
    
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <SideBar />
            </div>
        </>
    )
}

export default Home;