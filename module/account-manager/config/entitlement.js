var newEnforcer = require('casbin');

/*
const enforcerPromise = casbin.newEnforcer(
    // I have inlined the model and policy as a string literal.
    // I have not repeated it here because it is already above.
    casbin.newModel(model),
    new casbin.StringAdapter(policy));

async function enforce(sub, obj, act) {
    const e = await enforcerPromise;
    return await e.enforce(sub, obj, act);
}
*/


async function enforce(sub, obj, act) {
    const enforcer = await newEnforcer.newEnforcer('../model/entitlement/basic_model.conf', 
                                               '../model/entitlement/basic_policy.csv');
    return await enforcer.enforce(sub, obj, act);
}

/**
 * Authorize middleware
 * note : parameters needs to be send via request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function authorize(req, res, next){
    // TODO authorize
    /*
    if(){

    }else{
        res.status(403).json({ message: 'Forbidden' });
    }
    */
}

module.exports.enforce = enforce;