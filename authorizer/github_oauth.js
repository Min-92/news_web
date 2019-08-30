const request = require('request');
const { User } = require('../models/database');

class GithubOauth {
    constructor() {
        this.client_id = process.env.GITHUB_CLIENT_ID;
        this.client_secret = process.env.GITHUB_CLIENT_SECRET;
        this.scope = 'user';
        this.requestCodeURL = `https://github.com/login/oauth/authorize?` + `client_id=${this.client_id}` + `&scope=${this.scope}`;
        this.requestTokenURL = 'https://github.com/login/oauth/access_token?';
        this.requestUserURL = 'https://api.github.com/user';
    }

    login(req, res, next, code) {
        this.sendRequestToken(code, req, res, this.localLogin);
    }

    sendRequestToken(code, req, res, callback) {
        const options = {
            uri: this.requestTokenURL + `client_id=${this.client_id}&client_secret=${this.client_secret}&code=${code}`,
            method: 'POST',
            json: true
        };
        request.post(options, (err, response, body) => {
            if (err) return next(err);
            const token = body.access_token;

            const headers = {
                'Authorization': `token ${token}`, 'User-Agent': `wangmin-news`
            }

            request.get({ headers, url: this.requestUserURL }, async (err, innerRes, innerBody) => {
                const userData = JSON.parse(innerBody);
                const id = userData.login + '@github'

                callback(id, req, res, token);
            });
        });
    }


    async localLogin(id, req, res, token) {
        const user = await User.findOne({ id });
        if (!user) await User.create({ id, token });

        req.login(id);
        return res.redirect('/articles');
    }

}

module.exports = new GithubOauth();