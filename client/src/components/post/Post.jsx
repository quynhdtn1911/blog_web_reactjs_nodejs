import {Link} from 'react-router-dom';
import './post.css';

const Post = function({post}){
    return (
        <div className="post">
            <Link className="link" to={'/post/detail/' + post.id}>
                <img src={post && '/images/' + post.image}
                     alt="" 
                     className="postImg" />
            </Link>
            <ul className="postListCategory">
                <li className="postListCategoryItem">
                    <Link className="link" to={'/posts?cat=' + post.idCategory}>{post.categoryName}</Link>
                </li>
            </ul>
            <div className="postInfo">
                <Link className="link" to={'/post/detail/' + post.id}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postCreatedAt">{post.createdAt}</span>
            </div>
            <div className="postDesc">
                {post.desciption}
            </div>
        </div>
    )
}

export default Post;