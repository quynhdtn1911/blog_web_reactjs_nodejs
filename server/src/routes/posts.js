const express = require('express');
const router = express.Router();
const {execute} = require('../config/override');

router.get('/', async (req, res) => {
    try{
        const {cat, username} = req.query;
        let posts;
        let sql;
        if(cat){
            sql = 'select tblPost.*, tblCategory.name as categoryName, tblUser.username as username '
                + 'from tblPost, tblCategory, tblUser '
                + 'where idCategory=? and idCategory=tblCategory.id and idUser=tblUser.id';
            posts = await execute(sql, [cat]);
        }else if(username){
            sql = 'select tblPost.*, tblCategory.name as categoryName, tblUser.username as username '
                + 'from tblPost, tblUser, tblCategory '
                + 'where idUser=tblUser.id and username=? and idCategory=tblCategory.id';
            posts = await execute(sql, [username]);
        }else{
            sql = 'select tblPost.*, tblCategory.name as categoryName, tblUser.username as username '
                + 'from tblPost, tblUser, tblCategory '
                + 'where idUser=tblUser.id and idCategory=tblCategory.id';
            posts = await execute(sql);
        }
        
        if(posts.length > 0) res.json({success: true, message: posts});
        else res.json({success: true, message: null});
    }catch(err){
        res.json({success: false, message: 'Internal server error'});
    }
});

module.exports = router;