const nodeNotifier = require('node-notifier');
const wget = require('node-wget');

class NotifyUbuntu {

    downloadAlbumArt(albumArtUrl, destination, fnCallBack) {
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

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    generateRandomFileName() {
        return "albumArt-" + this.getRandomInt(1, 100000000);
    }

    notify({data}) {
        const summary = data.songName;
        const body = `${data.artists.join(', ')} - ${data.albumName}\n`
            + `S: ${data.timesSkipped} - L: ${data.timesListened} - B: ${data.remainingBannedSongs}`;
        const albumArtUrl = data.albumSmallImageUrl;
        const albumArtPath = '/tmp/' + this.generateRandomFileName();
        this.downloadAlbumArt(albumArtUrl, albumArtPath, function () {
            nodeNotifier.notify({
                title: summary,
                message: body,
                icon: albumArtPath
            });
        });
    }

}

module.exports = new NotifyUbuntu();