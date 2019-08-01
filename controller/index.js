const { User } = require('../models/database')

    module.exports = {
        getMessage: (req) => {
            const fmsg = req.flash();
            let message;
            if (fmsg.error) message = fmsg.error[0];
            return message
        },

        getUser: async (req) => {
            if(req.isAuthenticated()){
                const id = req.session.passport.user;
                const user = await User.findOne({id});
                return user;
            }
            return undefined;
        }
    }


