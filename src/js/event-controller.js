const gkm = require('gkm');

class EventController {

    constructor(emitFunctions, configuration) {
        this.KEY_TO_SKIP = configuration.skip_key;
        this.KEY_TO_GET_SONG = configuration.get_song_key;
        this.emitFunctions = emitFunctions;
        this.setKeyPressEvent();
    }

    setKeyPressEvent() {
        gkm.events.on('key.pressed', (data) => {
            if (this.mustSkip(data)) {
                this.sendSkipRequest();
            }
            if (this.isGetCurrentSong(data)) {
                this.sendGetCurrentSongRequest();
            }
        });
    }

    isGetCurrentSong(data) {
        return data[0] === this.KEY_TO_GET_SONG;
    }

    mustSkip(data) {
        return data[0] === this.KEY_TO_SKIP;
    }

    sendSkipRequest() {
        this.emitFunctions.emitSkipSongRequest();
    }

    sendGetCurrentSongRequest() {
        this.emitFunctions.emitGetCurrentSongRequest();
    }
}

module.exports = EventController;
