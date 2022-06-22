const { execute } = require("../config/override");

class PostController{

    async getPost(req, res){
        const idPost = req.params.id;
        try{
            const sql = "select tblPost.*, tblUser.username as username, tblCategory.name as categotyName "
                        + "from tblUser, tblPost, tblCategory "
                        + "where tblPost.id = ? and tblPost.idUser = tblUser.id and tblPost.idCategory = tblCategory.id";
            const posts = await execute(sql, [idPost]);
            if(posts.length > 0) res.json({success: true, message: posts[0]});
            else res.json({success: true, message: null});
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }

    async store(req, res){
        try{
            const {title, image, desciption, idUser, idCategory} = req.body;
            const sql = "insert into tblPost(title, desciption, image, idUser, idCategory) "
                        + "values(?,?,?,?,?)";
            const result = await execute(sql, [title, desciption, image, idUser, idCategory]);
            res.json({success: true, message: result.insertId});
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }

    async edit(req, res){
        try{
            const {id, title, desciption, image, username} = req.body;

            let sql = "select * from tblPost where id=?";
            const post = await execute(sql, [id]);
            if(!post) res.json({success: false, message: 'Post not found'});
            
            sql ='update tblPost set title=?, desciption=?, image=? where id=?';
            await execute(sql, [title, desciption, image, id]);
            res.json({success: true, message: ''});
        }catch{
            res.json({success: false, message: 'Internal Server Error'});
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const sqlFind = 'select * from tblPost where id=?';
            const resultFind = await execute(sqlFind, [id]);
            if(resultFind.length == 0) res.json({success: false, message: 'Post not found'});
            const sqlDelete = 'delete from tblPost where id=?';
            await execute(sqlDelete, [id]);
            res.json({success: true, message: ''});
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }
}

module.exports = new PostController;