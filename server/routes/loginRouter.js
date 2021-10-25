const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = Router();

loginRouter.post('/', loginController.getLogin, (req, res, error ) => {
  return res.status(200).send(res.locals.validUser);
});


module.exports = loginRouter;