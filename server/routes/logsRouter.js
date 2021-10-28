const { Router } = require('express');
const {getAppLogs,getAppFields, getIndices} = require('../controllers/logsController');
const logsRouter = Router();

logsRouter.get('/app',getAppLogs,(req,res)=>{
    res.status(200).json({appLogs:res.locals.appLogs})
})
logsRouter.get('/appFields',getIndices,getAppFields,(req,res)=>{
    res.status(200).json(res.locals.appFields)
})

module.exports = logsRouter;