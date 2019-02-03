const serializeError = require('serialize-error');

function TrackExceptions(func,...arg) {
    try {
        func(...arg);
    } catch(ex) {
        emitNet("Sentry:SubmitException",serializeError(ex));
        throw ex;
    }
}

module.exports.TrackExceptions = TrackExceptions;