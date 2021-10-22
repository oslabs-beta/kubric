const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = Router();

//loginRouter.get()

loginRouter.post(loginController.getLogin, (req, res, error ) => {
    console.log('in login router')
    res.status(200).send('leaving login router')
})

module.exports = loginRouter;