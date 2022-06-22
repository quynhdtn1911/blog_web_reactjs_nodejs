const {execute} = require('../config/db/override');

class CategoryController{
    async getCategories(){
        try{
            const sql = "select * from tblCategory";
            const categories = await execute(sql);
            if(categories.length > 0) json({access: true, message: categories});
            else json({access: true, message: null});
        }catch(err){
            res.json({access: false, message: 'Internal server err'});
        }
    }
}