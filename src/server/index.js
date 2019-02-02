const db = require('./db.js')

db.OpenDB("users",()=>{
    console.log('^4[Fivem-Housing] Resource Started, Database Loaded!');
})