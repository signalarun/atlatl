var passport = require('./config/passport');
var routes = require('./routes/api') 

//module.exports.passport = passport;
//module.exports.routes = routes;

/*
class AccountManager{
    constructor({mail}){
        this.mail = mail;
    }
}
*/

module.exports = (function(){    
    this.passport = passport;
    this.routes = routes;
    return this;
})();