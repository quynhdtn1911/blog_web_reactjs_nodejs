import './detail.css';
import DetailPost from '../../components/detailPost/DetailPost';
import SideBar from '../../components/sidebar/SideBar';
import {useLocation, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';

const  Detail = function(){
    const location = useLocation();
    const idPost = location.pathname.split('/')[3];
    const {authState} = useContext(AuthContext);
    const {user} = authState;

    if(!user) return <Navigate to='/login' />;

    return (
        <div className="detail">
            <DetailPost idPost={idPost}/>
            <SideBar />
        </div>
    )
}

export default Detail;
