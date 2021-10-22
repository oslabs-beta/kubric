const model = require("../model");

//will require database model for logins
const loginController = {};

loginController.getLogin = async (req, res, next) => {
    // console.log('login Controller')
    res.locals.validUser = false;
    const user = req.body.username;
    const pw = req.body.password;
    const userInDB = await model.find({username: `${req.body.username}`, password: `${req.body.password}`})
    if (!userInDB) {
        next()
    }
    // console.log('in cotroller', req.body)
    res.locals.validUser = true;
    return next()
}

loginController.signUp = async (req, res, next) => {
    res.locals.validUser = false;
    const user = req.body.username;
    const pw = req.body.password;
    const userCreated = await model.create({username: user, password : pw})
    if (userCreated) {
        res.locals.validUser = true;
    }
    next()
}




module.exports = loginController;