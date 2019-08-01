module.exports = {
    getMessage : (req) => {
        const fmsg = req.flash();
        let message;
        if (fmsg.error) message = fmsg.error[0];
        return message
    },

    getUser : (req) => {
        return req.isAuthenticated() ? req.session.passport.user : undefined
    }
}


