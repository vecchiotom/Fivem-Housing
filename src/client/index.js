const sentry = require('./errortracking.js');
const houses = require("./coords.js")
var DrawingHelp = false

function Distance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function DrawHelpText(text, loop, beep, duration) {
    AddTextEntry("HELP_TEXT", text)
    BeginTextCommandDisplayHelp("HELP_TEXT")
    EndTextCommandDisplayHelp(0, loop, beep, duration)
}

sentry.TrackExceptions(() => {
    console.log('client does run');
    for (let i = 0; i < houses.length; i++)
        if (houses[i].ipl) RequestIpl(houses[i].ipl);

    setTick(() => {
        sentry.TrackExceptions(() => {
            const Pcoords = GetEntityCoords(PlayerPedId(), true);
            for (let index = 0; index < houses.length; index++) {
                DrawMarker(0, houses[index].coords.x, houses[index].coords.y, houses[index].coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 204, 255, 0, 50, true, true, 2, null, null, false)
                let distance = Distance(Pcoords[0], houses[index].coords.x, Pcoords[1], houses[index].coords.y)
                if (distance < 1.2) {
                    if(!DrawingHelp) {
                        DrawHelpText("Press ~INPUT_PICKUP~ to leave the building",false,true,5000);
                        DrawingHelp = true
                        setTimeout(() => DrawingHelp=false,5000)
                    }
                    
                    if(IsControlJustReleased(0, 38))
                        window.exports['spawnmanager']['forceRespawn']()
                }
            }
        })
    })
})
setImmediate(()=>{
    RegisterCommand("tp", ()=>{
        SetEntityCoords(PlayerPedId(), -787.0961, 315.815, 187.9135, 0, 0, 0, true)
    }, false)
})