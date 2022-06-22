const bcrypt = require('bcrypt');
const {execute} = require('../config/override');

class UserController{
    async getUser(req, res){
        try{
            const id = req.params.id;
            const sql = 'select * from tblUser where id=?';
            const result = await execute(sql, [id]);
            if(result.length == 0) res.json({success: false, message: 'User not found'});
            else{
                const {password, ...other} = result[0];
                res.json({success: true, message: other});
            }
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }

    async edit(req, res){
        try{
            const id = req.params.id;
            const {gender, email, address, avatar} = req.body;
            const sqlFind = 'select * from tblUser where id=?';
            const resultFind = await execute(sqlFind, [id]);
            if(resultFind.length == 0) res.json({success: false, message: 'User not found'});
            const sqlUpdate = 'update tblUser set gender=?, email=?, address=?, avatar=? where id=?';
            await execute(sqlUpdate, [gender, email, address, avatar, id]);
            res.json({success: true, message: ''});
            // if(result.length == 0) res.json({success: false, message: 'User not found'});
            // if(! await bcrypt.compare(password, user.password)){
            //     res.json({success: false, message: 'Incorrect old password'});
            // }else if(newPassword != confirmPassword){
            //     res.json({success: false, message: 'Incorrect confirm password'});
            // }else{
            //     const salt = await bcrypt.genSalt(10);
            //     const hashedPassword = await bcrypt.hash(newPassword, salt);
            //     const newUser = await User.findOneAndUpdate({_id: idUser}, {password: hashedPassword}, true);
            //     const {password, ...others} = newUser._doc;
            //     res.json({success: true, message: others});
            // }
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }

    async changePassword(req, res){
        try{
            const id = req.params.id;
            const {password, newPassword, confirmNewPassword} = req.body;
            const sqlFind = 'select password from tblUser where id=?';
            const resultFind = await execute(sqlFind, [id]);
            if(resultFind.length == 0) res.json({success: false, message: 'User not found'});
            else{
                const isValid = await bcrypt.compare(password, resultFind[0].password);
                if(!isValid) res.json({success: false, message: 'Incorrect your old password'});
                else if(newPassword != confirmNewPassword){
                    res.json({success: false, message: 'Incorrect confirm password'});
                }else{
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(newPassword, salt);
                    const sqlUpdate = 'update tblUser set password=? where id=?';
                    await execute(sqlUpdate, [hashedPassword, id]);
                    res.json({success: true, message: ''});
                }
            }
        }catch(err){
            res.json({success: false, message: 'Internal server error'});
        }
    }
}

module.exports = new UserController;