const { where } = require('sequelize')
const { User } = require('../db/models')

class UserServices {

    static getUser = async(email) => {
        try {
            const user = await User.findOne({where: {email}})
            if(user){
                return user
            }
            return null
        } catch ({message}) {
            return {status: 'error', message}
        }
    }

    static createUser = async({name, email, password}) => {
        try {
            let user;
            user = await User.findOne({ where: { email } });

            
            if (!user) {
                user = await User.create({ name, email, password});
                return user
              }
            
            return null
        } catch ({message}) {
            return {status: 'error', message}
        }
    }
}

module.exports = UserServices