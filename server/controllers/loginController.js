const model = require('../model');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.getLogin = async (req, res, next) => {
  res.locals.validUser = false;  
  const user = req.body.username;
  const pw = req.body.password;

  const userInDB = await model.find({username : user});

  if (userInDB.length) {
    bcrypt.compare(pw, userInDB[0].password, (err, data) => { 
      try {
        if (err) {
          res.locals.validUser = false;
        }
        if (data) {
          res.locals.validUser = true;
        }
        next();
      }
      catch(err) {return next(err)}
    });
  } else {
    res.locals.validUser = false;
    next();
  }
};

loginController.signUp = async (req, res, next) => {
  res.locals.validUser = false;
  const user = req.body.username;
  const pw = req.body.password;

  bcrypt.hash(pw, 10, async (err, hash) => {
    const userInDB = await model.create({username: user, password: hash});
    res.locals.validUser = true;
    next();
  });
};

module.exports = loginController;

