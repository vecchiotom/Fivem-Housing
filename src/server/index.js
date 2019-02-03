const db = require('./db.js')
const sentry = require('./errortracking.js')

db.OpenDB("users",sentry.TrackExceptions,()=>{
    console.log('[^4Fivem-Housing^7] Resource Started, Database Loaded!');
})