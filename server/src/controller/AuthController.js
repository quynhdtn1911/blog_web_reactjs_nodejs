const bcrypt = require('bcrypt');
const {execute} = require('../config/override');

class AuthController{
    async login(req, res){
        try{
            const {username, password} = req.body;
            const sql = 'select * from tblUser where username = ?';
            const user = await execute(sql, [username]);
            if(user.length == 0) res.json({success: false, message: 'Incorrect username or password'});
            else{
                const isValid = await bcrypt.compare(password, user[0].password);
                if(!isValid) res.json({success: false, message: 'Incorrect username or password'});
                else{
                    const {password, ...other} = user[0];
                    res.json({
                        success: true, 
                        message: other
                    });
                }
            }
        }catch(err){
            res.json('Internal server error');
        }
    }

    async register(req, res){
        try{
            const {username, password, confirmPassword, email, address, gender} = req.body;
            const sqlFind = 'select * from tblUser where username = ?';
            const user = await execute(sqlFind, [username]);
            if(user.length > 0) res.json({success: false, message: 'Exist username'});
            if(password != confirmPassword){
                res.json({success: false, message: 'Incorrect confirm password'});
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const sqlAdd = 'insert into tblUser(username, password, email, address, gender) values(?,?,?,?,?)';
                await execute(sqlAdd, [username, hashedPassword, email, address, gender]);
                res.json({success: true, message: ''});
            }
        }catch(err){
            res.json(err);
        }
    }
}

module.exports = new AuthController;