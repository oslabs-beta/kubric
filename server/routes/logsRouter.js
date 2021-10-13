const { Router } = require('express');
const {getElasticLogs} = require('../controllers/logsController');
const logsRouter = Router();

logsRouter.get('/',getElasticLogs,(req,res)=>{
    console.log(res.locals.elastic)
    res.status(200).json({elastic:res.locals.elastic})
})

module.exports = logsRouter;