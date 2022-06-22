import './profile.css';
import {Navigate} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
    // use context;
    const {authState} = useContext(AuthContext);
    const {user} = authState;
    
    // state
    const [edit, setEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [formData, setFormData] = useState(null);
    const [formPassword, setFormPassword] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        getUser();
        // return () => {
        //     setEdit(false);
        //     setChangePassword(false);
        //     setFormData(null);
        //     setNewPassword(null);
        // }
    }, [edit, changePassword]);
    
    const getUser = async () => {
        const id = user ? user.id : '';
        if(id){
            console.log('id: ' + id);
            const result = await axios.get('/user/' + id);
            const data = result.data;
            if(data.success) setFormData(data.message);
        }
    }

    // handle event
    const toggleEdit = () => {
        setEdit(!edit);
    }
    
    const toggleChangePassword = () => {
        setChangePassword(!changePassword);
    }
    
    const onChangeForm = async (event) => {
        if(event.target.type == 'radio'){
            if(event.target.checked){
                setFormData({
                    ...formData,
                    [event.target.name]: event.target.value
                })
            }
        }else if(event.target.name == 'avatar'){
            const file = event.target.files[0];
            setFormData({
                ...formData,
                file: file
            })
        }else{
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = formData;
        if(formData.file){
            const form = new FormData();
            const fileName = 'user-' + Date.now() + formData.file.name;
            form.append('name', fileName);
            form.append('file', formData.file);
            await axios.post('/upload', form);
            newUser.avatar = fileName;
        }
        newUser.id = user.id;
        const result = await axios.put('/user/' + newUser.id, newUser);
        const data = result.data;
        if(data.success){
            toggleEdit();
            setError('');
        }else{
            setError(data.message);
        }
    }

    const onChangePassword = (event) => {
        setFormPassword({
            ...formPassword,
            [event.target.name]: event.target.value
        })
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const newFormPassword = formPassword;
        const result = await axios.put('/user/' + user.id + '/change-password', newFormPassword);
        const data = result.data;
        if(data.success){
            toggleChangePassword();
            setError('');
        }else{
            setError(data.message);
        }
    }
    if(!user) return <Navigate to='/login' />;
    return <div 
                className="profile"
                style={{ 
                    background: "url('https://cdn.pixabay.com/photo/2017/09/24/19/17/pencil-2782840_960_720.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
                >
            <div className="profileContainer">
                <div className="profileOption">
                    <div className="profileOptionLabel">
                        <img 
                            src="https://cdn-icons.flaticon.com/png/512/2356/premium/2356811.png?token=exp=1646298146~hmac=72edaefcfd6f9201a141d07613c8d83c" 
                            alt="" />
                    </div>
                    <ul className="profileOptionList">
                        <li 
                            className="profileOptionItem"
                            onClick={toggleEdit}
                            >Edit profile</li>
                        <li 
                            className="profileOptionItem"
                            onClick={toggleChangePassword}
                            >Change your password</li>
                    </ul>
                </div>
                <div className="profileAvatar">
                    <img 
                        className="profileImg"
                        src={formData && formData.file ? URL.createObjectURL(formData.file)
                            : (formData && formData.avatar ? '/images/' + formData.avatar : "/images/user.png")
                        } 
                        alt="" />
                    {
                        edit && <div className="profileInputAvatar">
                        <label htmlFor="avatar" className="profileAvatarLabel">
                            <img src="/images/camera.png" alt="" />
                        </label>
                        <input 
                            type="file" 
                            name="avatar" 
                            id="avatar" 
                            hidden
                            onChange={onChangeForm} 
                            />
                    </div>
                    }
                </div>
                <div className="profileContent">
                    <p className="profileInfo profileUsername">ABC</p>
                    {
                        edit && <div className="profileForm">
                                <div className="profileInputGroup">
                                    <label className="profileLabel">Gender: </label>
                                    <div>
                                        <input
                                            className="profileInput"
                                            type="radio" 
                                            name="gender"
                                            id="male"
                                            value="0"
                                            onChange={onChangeForm}
                                            />
                                        <label htmlFor="male" className="profileLabel profileSubLabel">Male</label>
                                        <input
                                            className="profileInput"
                                            type="radio" 
                                            name="gender" 
                                            id="female"
                                            value="1"
                                            onChange={onChangeForm}
                                            />
                                        <label htmlFor="female" className="profileLabel profileSubLabel">Female</label>
                                    </div>
                                </div>
                                <div className="profileInputGroup">
                                    <label className="profileLabel">Email: </label>
                                    <input
                                        className="profileInput" 
                                        type="email" 
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData && formData.email}
                                        onChange={onChangeForm}
                                        /><br/>
                                </div>
                                <div className="profileInputGroup">
                                    <label className="profileLabel">Address: </label>
                                    <input
                                        className="profileInput" 
                                        type="text" 
                                        name="address"
                                        placeholder="Enter your address"
                                        value={formData && formData.address}
                                        onChange={onChangeForm}
                                        />
                                </div>
                        </div>
                    }
                    {
                        changePassword && <div className="profileForm">
                            <div className="profileInputGroup">
                                <label className="profileLabel">Your old password: </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="profileInput" 
                                    value={formPassword && formPassword.password}
                                    onChange={onChangePassword}
                                    />
                            </div>
                            <div className="profileInputGroup">
                                <label className="profileLabel">Your new password: </label>
                                <input 
                                    type="password" 
                                    name="newPassword" 
                                    className="profileInput" 
                                    value={formPassword && formPassword.newPassword}
                                    onChange={onChangePassword}
                                    />
                            </div>
                            <div className="profileInputGroup">
                                <label className="profileLabel">Confirm password: </label>
                                <input 
                                    type="password" 
                                    name="confirmNewPassword" 
                                    className="profileInput" 
                                    value={formPassword && formPassword.confirmNewPassword}
                                    onChange={onChangePassword}
                                    />
                            </div>
                        </div>
                    }
                    {
                        !edit && !changePassword && <>
                            <p className="profileInfo">Email: {formData && formData.email}</p>
                            <p className="profileInfo">Gender: {formData && (formData.gender == 0 ? 'Nam' : 'Nữ')}</p>
                            <p className="profileInfo">Address: {formData && formData.address}</p>
                        </>
                    }
                </div>
                {error && <p className="profileError">{error}</p>}
                {
                    edit && <div className="btnGroupEdit">
                        <button
                            className="btn btn-cancel"
                            onClick={toggleEdit}
                            >Cancel</button>
                        <button 
                            className="btn btn-save" 
                            onClick={handleSubmit}
                            >Save</button>
                    </div>
                }
                {
                    changePassword && <div className="btnGroupEdit">
                        <button
                            className="btn btn-cancel"
                            onClick={toggleChangePassword}
                            >Cancel</button>
                        <button 
                            className="btn btn-save" 
                            onClick={handleChangePassword}
                            >Save</button>
                    </div>
                }
            </div>
        </div>
}

export default Profile;