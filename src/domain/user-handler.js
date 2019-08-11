const User = require('../models/user');
const util = require('../util/utilities');

const userPropertiesAllowed = ['name','avatar'];
/**
 * Create User
 * @param user 
 */
const createUser = async (user) => {

    try{
        if(util.validateProperties(user,userPropertiesAllowed)){
            const userdb = new User(user);
            await userdb.save();
            return userdb;
        }
        else {
            throw new Error('Invalid properties');
        }
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    createUser
}