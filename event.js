require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    planning_lol: "677556140913197057",
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function envoieJours(chan){
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

    //let ddSave
    
    let cpt = 1

    for await(let jour of jours){
        
        let date = new Date('December 28, 1995 03:24:00')
        date.addDays(cpt)
        cpt++
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        /*if(dd < ddSave){
            mm++
        }
        ddSave = dd*/
        console.log(`${jour} ${String(dd).padStart(2, '0')}/${String(mm).padStart(2, '0')}`)
        chan.send({embed: {title : `${jour} ${String(dd).padStart(2, '0')}/${String(mm).padStart(2, '0')}`}})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })
    }
}

async function clear(chan) {
    const fetched = await chan.fetchMessages({limit: 99});
    chan.bulkDelete(fetched);
}

module.exports = class Event{
    static eventMessage(bot){
        const chan = bot.channels.get(channelsID.planning_lol)
        
        clear(chan)
        .then(() => envoieJours(chan))
        .then(() => chan.send("@everyone"))
    }
}