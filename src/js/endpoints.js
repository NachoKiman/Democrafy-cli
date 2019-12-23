const notifyUbuntu = require('./notify-ubuntu');
const authenticator = require('./authenticator');

function onAction(action, io) {
    switch (action.type) {
        case 'LOG_IN_USER_FULFILLED':
            authenticator.markAsAuthenticated();
            console.log('Ready player one!');
            break;
        case 'LOG_IN_USER_REJECTED':
            console.warn(action.payload.data.msj);
            authenticator.init(emitAuthenticate.bind(this, io));
            break;
        case 'VOTE_SKIP_SONG_FULFILLED':
            console.info(action.payload.data.msj);
            break;
        case 'VOTE_SKIP_SONG_REJECTED':
            console.warn(action.payload.data.msj);
            break;
        case 'FETCH_CURRENT_SONG_FULFILLED':
            notifyUbuntu.notify(action.payload);
            break;
        case 'FETCH_CURRENT_SONG_REJECTED':
            console.error('Error occurred.');
            break;
        default:
            break;
    }
}

function onConnect(io) {
    authenticator.init(emitAuthenticate.bind(this, io));
}

function emitAuthenticate(io, userName, password) {
    emit(io, 'LOG_IN_USER', {username: userName, password});
}

function emitSkipSongRequest(io) {
    if (authenticator.isAuthenticated) {
        emit(io, 'VOTE_SKIP_SONG', {userName: authenticator.userName});
    }
}

function emitGetCurrentSongRequest(io) {
    if (authenticator.isAuthenticated) {
        emit(io, 'FETCH_CURRENT_SONG', {userName: authenticator.userName});
    }
}

function emit(socket, type, payload) {
    socket.emit('action', {
        type: type,
        payload
    });
}

module.exports = (io) => {
    io.on('action', (action) => onAction(action, io));
    io.on('connect', () => onConnect(io));
    return {
        emitSkipSongRequest: emitSkipSongRequest.bind(this, io),
        emitGetCurrentSongRequest: emitGetCurrentSongRequest.bind(this, io)
    };
};