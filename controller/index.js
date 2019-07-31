module.exports = {
    getMessage : (req) => {
        const fmsg = req.flash();
        let message;
        if (fmsg.error) message = fmsg.error[0];
        return message
    }
}


