import './register.css';
import {Link, Navigate} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import {useState, useContext} from 'react';
import axios from 'axios';
import {STARTED_REGISTER, SUCCESS_REGISTER, FAILURE_REGISTER, INIT_STATE} from '../../actions/action';

const Register = function(){
    // state
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [status, setStatus] = useState(false);

    const {username, password, confirmPassword} = form;
    // use context
    const {authState, dispatch} = useContext(AuthContext);
    const {user} = authState;
    
    // handle event
    const changeForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(STARTED_REGISTER());
        const result = await axios.post('/auth/register', form);
        const data = result.data;
        if(data.success){
            dispatch(SUCCESS_REGISTER());
            setStatus(true);
        }else{
            dispatch(FAILURE_REGISTER(data.message));
        }
    }

    if(user) return <Navigate to='/' />;
    if(status) return <Navigate to='/login' />;
    return (
        <div className="register">
            <div className="registerTitle">Regsiter</div>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label className="registerLabel">Username</label>
                <input 
                    className="registerInput" 
                    type="text" 
                    name="username" 
                    placeholder="Enter your username..."
                    value={username}
                    onChange={changeForm}
                    required
                    />
                <label className="registerLabel">Password</label>
                <input 
                    className="registerInput" 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password..."
                    value={password}
                    onChange={changeForm}
                    required
                    />
                <label className="registerLabel">Confirm password</label>
                <input 
                    className="registerInput" 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Enter your confirm password" 
                    value={confirmPassword}
                    onChange={changeForm}
                    />
                <input className="btn btnRegister" type="submit" value="Register" />
            </form>
            <p className="message_error">{authState.error}</p>
            <p>
                Have already account?
                <Link to="/login">
                    <button 
                        className="btn btnRegisterLogin" 
                        onClick={() => dispatch(INIT_STATE())}
                        >Login</button>
                </Link>
            </p>
        </div>
    )
}

export default Register;