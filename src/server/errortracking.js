var Raven = require('raven');
const deserializeError = require('deserialize-error');
Raven.config('https://bfb99869505c49ed8fbf45c52d0ef3e9@sentry.io/1385948' ).install();

function TrackExceptions(func,...arg) {
    try {
        func(...arg);
    } catch(ex) {
        Raven.captureException(ex);
        throw ex;
    }
}
function SubmitException(ex) {
    Raven.captureException(ex);
}

onNet("Sentry:SubmitException", ex=>{
    SubmitException(deserializeError(ex))
    console.error("an exception was encountered. It has been automatically submitted to the developers.")
})

module.exports.TrackExceptions = TrackExceptions;