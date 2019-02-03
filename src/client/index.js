const sentry = require('./errortracking.js');

sentry.TrackExceptions(() => {
    console.log('client does run');
})
