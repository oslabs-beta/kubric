//will require database model for logins
const loginController = {};

loginController.getLogin = (req, res, next) =>{
    console.log('login Controller')
    next()
}

module.exports = loginController;