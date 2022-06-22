const express = require('express');
const router = express.Router();
const {execute} = require('../config/override');

router.get('/', async (req, res) => {
    try{
        const sql = 'select * from tblCategory';
        const categories = await execute(sql, []);
        if(categories.length > 0) res.json({success: true, message: categories});
        else res.json({success: false, message: null});
    }catch(err){
        res.json({success: false, message: 'Internal server error'})
    }
})

module.exports = router;