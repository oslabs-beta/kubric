const model = require('../model');

//will require database model for logins
const loginController = {};

loginController.getLogin = async (req, res, next) => {
  console.log('login Controller')
  res.locals.validUser = false  
  console.log('req body', req.body)
  const user = req.body.username;
  const pw = req.body.password;
  console.log('user in controller', user);  
  console.log('pw in controller', pw);

  try  {
    const userInDB = await model.find({username: `${req.body.username}`, password: `${req.body.password}`});
    console.log('user in DB', userInDB);
    if (userInDB === []) {
      return next();
    }
    // console.log('in cotroller', req.body)
    res.locals.validUser = true;
    return next();
  }
  catch(err) {return next(err)}  
 
}

loginController.signUp = async (req, res, next) => {
  res.locals.validUser = false;
  const user = req.body.username;
  const pw = req.body.password;
  console.log('in signup controller', user)
  console.log('in signup controller', pw)
  try {
    const userCreated = await model.create({username: user, password : pw})
    console.log(userCreated)
    if (userCreated) {
      res.locals.validUser = true;
    }
    console.log(res.locals.validUser)
    next()
  }
  catch(err) {return next(err)}

}

module.exports = loginController;