const { Router } = require('express');
const loginController = require('../controllers/loginController');
const signUpRouter = Router();

signUpRouter.post('/', loginController.signUp, (req, res, error ) => {
  return res.status(200).send(res.locals.validUser);
});

module.exports = signUpRouter;