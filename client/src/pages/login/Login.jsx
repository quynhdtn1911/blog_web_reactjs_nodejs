import './login.css';
import {useContext, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import {STARTED_LOGIN, SUCCESS_LOGIN, FAILURE_LOGIN, INIT_STATE} from '../../actions/action';
import axios from 'axios';

const Login = function(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const {authState, dispatch} = useContext(AuthContext);
    
    if(authState.user) return <Navigate to='/' />;

    const onChangeForm = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(STARTED_LOGIN());
        const result = await axios.post('/auth/login', formData);
        const data = result.data;
        if(data.success){
            const localStorage = window.localStorage;
            localStorage.setItem('blog_app', JSON.stringify({user: data.message}));
            console.log(data.message);
            dispatch(SUCCESS_LOGIN(data.message));
        }else{
            dispatch(FAILURE_LOGIN(data.message));
        }
    }

    return (
        <div className="login">
            <div className="loginTitle">Login</div>
            <form className="loginForm" onSubmit={handleLogin}>
                <label className="loginLabel">Username</label>
                <input 
                    className="loginInput" 
                    type="text" 
                    name="username" 
                    placeholder="Enter your username..."
                    value={username}
                    onChange={onChangeForm} 
                />
                <label className="loginLabel">Password</label>
                <input 
                    className="loginInput" 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password..."
                    value={password}
                    onChange={onChangeForm} 
                />
                <input className="btn btnLogin" type="submit" value="Login" />
            </form>
            <p className="loginMessage">
                {authState.error}
            </p>
            <p>
                Don't have account?
                <Link to="/register" className="link">
                    <button 
                        className="btn btnLoginRegister"
                        onClick={() => dispatch(INIT_STATE())}
                        >Register</button>
                </Link>
            </p>
        </div>
    )
}

export default Login;