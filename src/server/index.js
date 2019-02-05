const db = require('./db.js')
const sentry = require('./errortracking.js')

db.OpenDB("users", sentry.TrackExceptions, () => {
    console.log('[^4Fivem-Housing^7] Resource Started, Database Loaded!');
})

on("playerConnecting", (x,kick) => {
    const source = window.source;
    sentry.TrackExceptions(() => {
        setImmediate(() => {
            let identifier = GetIdentifier(source)
            if (identifier){
                db.GetUser(identifier, sentry.TrackExceptions, (result) => {
                    console.log(result);
                    if (result == false) {
                        db.InsertUser({
                            id: identifier,
                            house: -1
                        }, sentry.TrackExceptions, () => {
                            console.log("[^4Fivem-Housing^7] Added new user to db!");
                        })
                    }
                })
            } else {
                kick("You need to have Steam running to enter the server.")
            }
        })
    })
})

function GetIdentifier(source) {
    let identifiers = GetPlayerIdentifiers(source)
    for (let index = 0; index < identifiers.length; index++) {
        if (identifiers[index].startsWith("steam:"))
            return identifiers[index];
    }
}

function GetPlayerIdentifiers(player) {
    var numIds = GetNumPlayerIdentifiers(player);
    var t = [];

    for (let i = 0; i < numIds; i++) {
        t.push(GetPlayerIdentifier(player, i));
    }

    return t;
}