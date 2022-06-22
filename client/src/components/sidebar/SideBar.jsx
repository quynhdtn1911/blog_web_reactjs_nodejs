import './sidebar.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SideBar = function(){
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const result = await axios.get('/categories');
        const data = result.data;
        if(data.success) setCategories(data.message);
    }
    return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img className="sidebarImg" src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
            <p className="sidebarDesc">
            Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
            amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            {
                categories && <ul className="sidebarList">
                    {
                        categories.map((category) => {
                            return <li key={category.id} className="sidebarListItem">
                                    <Link className="link" to={'/posts?cat=' + category.id}>
                                        {category.name}
                                    </Link>
                                </li>
                    
                        })
                    }
                </ul>

            }
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocials">
                <i className="fa-brands fa-facebook-square sidebarIcon"></i>
                <i className="fa-brands fa-twitter-square sidebarIcon"></i>
                <i className="fa-brands fa-instagram-square sidebarIcon"></i>
                <i className="fa-brands fa-pinterest-square sidebarIcon"></i>
            </div>
        </div>
    </div>
    );
}

export default SideBar;