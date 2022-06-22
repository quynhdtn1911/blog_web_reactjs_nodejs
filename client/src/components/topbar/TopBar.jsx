import './topbar.css';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {LOGOUT} from '../../actions/action';

const TopBar = function(){
    const {authState, dispatch} = useContext(AuthContext);
    const user = authState.user;

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(LOGOUT());
    }
    return (
        <div className="topbar">
            <div className="topLeft">
                <i className="fa-brands fa-facebook-square topIcon"></i>
                <i className="fa-brands fa-twitter-square topIcon"></i>
                <i className="fa-brands fa-instagram-square topIcon"></i>
                <i className="fa-brands fa-pinterest-square topIcon"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to='/' className="link">
                            HOME
                        </Link> 
                    </li>
                    <li className="topListItem">
                        <Link to='/about' className="link">
                            ABOUT
                        </Link> 
                    </li>
                    <li className="topListItem">
                        <Link to='/contact' className="link">
                            CONTACT
                        </Link> 
                    </li>
                    <li className="topListItem">
                        <Link to='/write' className="link">
                            WRITE
                        </Link> 
                    </li>
                    {
                        user ? 
                        <li className="topListItem" onClick={handleLogout}>
                             LOGOUT
                        </li> 
                        : 
                        <>
                        <li className="topListItem">
                                    <Link to='/login' className="link">
                                        LOGIN
                                    </Link> 
                        </li> 
                        <li className="topListItem">
                                    <Link to='/register' className="link">
                                        REGISTER
                                    </Link> 
                        </li> 
                        </>
                    }
                    
                </ul>
            </div>
            <div className="topRight">
                <Link className="link" to='/profile'>
                    <img src={user && user.avatar ? '/images/' + user.avatar : '/images/user.png'} 
                        alt="avatar" 
                        className="topImg" 
                    />
                </Link>
                <i className="fa-solid fa-magnifying-glass topSearchIcon"></i>
            </div>
        </div>
    )
}

export default TopBar;