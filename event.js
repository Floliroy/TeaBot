require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    planning_lol: "677556140913197057",
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function envoieJours(chan){
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    
    let cpt = 1

    for await(let jour of jours){
        
        let date = new Date('December 28, 1995 03:24:00')
        date.addDays((cpt++))
        console.log("Days : " + cpt)
        let dd = String(date.getDate()).padStart(2, '0')
        let mm = String(date.getMonth() + 1).padStart(2, '0')
        
        console.log(`${jour} ${dd}/${mm}`)

        chan.send({embed: {title : `${jour} ${dd}/${String(mm).padStart(2, '0')}`}})
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