var Raven = require('raven');
Raven.config('https://bfb99869505c49ed8fbf45c52d0ef3e9@sentry.io/1385948' ).install();

function TrackExceptions(func,...arg) {
    try {
        func(...arg);
    } catch(ex) {
        Raven.captureException(ex);
    }
}
function SubmitException(ex) {
    Raven.captureException(ex);
}

module.exports.TrackExceptions = TrackExceptions;
module.exports.SubmitException = SubmitException;
