import './posts.css';
import Post from '../post/Post';

const Posts = function({posts}){
    return <div className="posts">
        {posts && posts.map((post) => {
            return <Post key={post.id} post={post} />
        })}
    </div>;
}

export default Posts;