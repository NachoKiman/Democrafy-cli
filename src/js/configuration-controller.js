/**
 * Libreria para el manejo de archivos.
 */
const fs = require('fs');

var configurationController = (function () {

    const FILE_ENCODING = 'UTF8';
    var configuration;

    function init(configuration_file_path, callback) {
        loadConfig(configuration_file_path, callback);
    }

    function loadConfig(configuration_file_path, callback) {
        fs.readFile(configuration_file_path, FILE_ENCODING, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.info('Config loaded');
            configuration = JSON.parse(data);
            callback(configuration);
        });
    }

    function getConfiguration() {
        return configuration;
    }

    return {
        init: init,
        getConfiguration: getConfiguration
    };
})();

module.exports = configurationController;