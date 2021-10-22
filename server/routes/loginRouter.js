const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = Router();

//loginRouter.get()

loginRouter.post('/',loginController.getLogin, (req, res, error ) => {
    console.log('in login router')
    // return res.status(200).send('leaving login router')
    return res.status(200).send(res.locals.validUser)


})

module.exports = loginRouter;