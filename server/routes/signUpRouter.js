const { Router } = require('express');
const loginController = require('../controllers/loginController');
const signUpRouter = Router();

signUpRouter.post('/', loginController.signUp, (req, res, error ) => {
    console.log('in login router res validUser value', res.locals.validUser)
    // return res.status(200).send('leaving login router')
    return res.status(200).send(res.locals.validUser)
})

module.exports = signUpRouter;