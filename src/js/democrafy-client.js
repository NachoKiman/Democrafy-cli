const configurationController = require('./configuration-controller');
const EventController = require('./event-controller');
const io = require('socket.io-client');
const setupEndpoints = require("./endpoints");

class Client {

    start() {
        configurationController.init(__dirname + '/config.json', (configuration) => {
            const emitFunctions = this.defineSocketConnection(configuration);
            const eventController = new EventController(emitFunctions, configuration);
        });
    }

    defineSocketConnection(configuration) {
        const socket = io(`http://${configuration.server_ip}:${configuration.server_port}/client`, {origins: '*:*'});
        return setupEndpoints(socket);
    }
}

module.exports = new Client();