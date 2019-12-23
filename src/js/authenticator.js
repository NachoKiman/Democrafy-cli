var readlineSync = require('readline-sync');

class Authenticator {

    constructor() {
        this.userName = '';
        this.isAuthenticated = false;
    }

    init(authenticate) {
        this.userName = readlineSync.question('User: ', {
            hideEchoBack: false
        });

        const password = readlineSync.question('Password: ', {
            hideEchoBack: true
        });
        authenticate(this.userName, password);
    }

    markAsAuthenticated() {
        this.isAuthenticated = true;
    }
}

module.exports = new Authenticator();

