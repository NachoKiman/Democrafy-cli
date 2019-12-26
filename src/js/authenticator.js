const readlineSync = require('readline-sync');

class Authenticator {

    constructor() {
        this.reset();
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

    reset() {
        this.userName = '';
        this.isAuthenticated = false;
    }
}

module.exports = new Authenticator();

