const needle = require('needle');

let defaults = {
    client_id: "",
    client_secret: "",
    sandbox: false
};

let settings = {};

let url = "https://api.codeswholesale.com";

module.exports.configure = function(inp) {
    settings = {...defaults, ...inp};
    if(settings.sandbox) url = "https://sandbox.codeswholesale.com";
};

async function getToken()
{
    return new Promise((resolve, reject) => {
        needle('POST', `${url}/oauth/token`, {
            grant_type: 'client_credentials',
            client_id: settings.client_id,
            client_secret: settings.client_secret
        }, {
            json: false
        }).then((response) => {
            if(response.statusCode == 200) {
                currentToken = response.body;
                currentToken.expires_in = new Date().getTime() + (currentToken.expires_in * 1000);
                currentToken.expired = function() {
                    return this.expires_in < new Date().getTime();
                }
                resolve();
            } else {
                reject(response.body);
            }
        }).catch((err) => {
            reject(err);
        })
    });
}

let currentToken = null;

module.exports.execute = async function(method, endpoint, data = {}) {
    return new Promise(async (resolve,reject) => {
        if(currentToken == null || currentToken.expired()) {
            await getToken()
            .then(() => invoke())
            .catch((err) => reject(err));
        } else {
            invoke();
        }
        function invoke() {
            needle(method, `${url}${endpoint}`, data, {
                headers: {
                    'Authorization': `${currentToken.token_type} ${currentToken.access_token}`
                },
                json: true
            }).then((response) => {
                if(response.statusCode == 200) {
                    resolve(response.body);
                } else {
                    reject(response.body);
                }
            }).catch((err) => {
                reject(err);
            });
        }
    });
}