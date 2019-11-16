const request = require('request');
const gkm = require('gkm');
const wget = require('node-wget');
const nodeNotifier = require('node-notifier');

const configurationController = require('configuration-controller');

var client = (function () {

    function init() {
        configurationController.init(__dirname + '/config.json', eventController);
    }

    return {
        init: init
    };
})();

var eventController = (function (configuration) {

    const USER_NAME = configuration.user_name;

    const SERVER_IP = configuration.server_ip;

    const SERVER_PORT = configuration.server_port;

    const KEY_TO_SKIP = configuration.skip_key;

    const KEY_TO_GET_SONG = configuration.get_song_key;
    gkm.events.on('key.pressed', function (data) {
        if (mustSkip(data)) {
            sendSkipRequest();
        }
        if (isGetCurrentSong(data)) {
            sendGetCurrentSongRequest();
        }
    });
    console.log('Ready player one!');

    function isGetCurrentSong(data) {
        return data[0] === KEY_TO_GET_SONG;
    }

    function mustSkip(data) {
        return data[0] === KEY_TO_SKIP;
    }

    function sendSkipRequest() {
        request({url: `${getBaseUrl()}/next${USER_NAME}`}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.info(response.body);
            } else {
                console.warn(response.body);
            }
        });
    }

    function sendGetCurrentSongRequest() {
        request({url: `${getBaseUrl()}/song`, qs: {user: USER_NAME}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(response.body);
                notifyUbuntu.notify(result);
            } else {
                console.error('Error occurred.');
            }
        });
    }

    function getBaseUrl() {
        return 'http://' + SERVER_IP + ':' + SERVER_PORT;
    }

});

var notifyUbuntu = (function () {

    function downloadAlbumArt(albumArtUrl, destination, fnCallBack) {
        wget({
                url: albumArtUrl,
                dest: destination
            }, function (error) {
                if (error) {
                    console.log('Album Art --- error:');
                    console.log(error);
                } else {
                    fnCallBack();
                }
            }
        );
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateRandomFileName() {
        return "albumArt-" + getRandomInt(1, 100000000);
    }

    function notify(songData) {
        var summary = songData.songName;
        var body = `${songData.artists.join(', ')} - ${songData.albumName}\n`
            + `S: ${songData.timesSkipped} - L: ${songData.timesListened} - B: ${songData.remainingBannedSongs}`;
        var albumArtUrl = songData.albumSmallImageUrl;
        var albumArtPath = '/tmp/' + generateRandomFileName();
        downloadAlbumArt(albumArtUrl, albumArtPath, function () {
            nodeNotifier.notify({
                title: summary,
                message: body,
                icon: albumArtPath
            });
        });
    }

    return {
        notify: notify
    }
})();

client.init();