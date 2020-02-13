require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    planning_lol: "677556140913197057",
}

async function envoieJours(chan){
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

    const today = new Date()
    let ddSave
    let mm = today.getMonth() + 1
    
    let cpt = 1

    for await(let jour of jours){
        
        let dd = today.getDate() + (cpt++)
        if(dd < ddSave){
            mm++
        }
        ddSave = dd

        chan.send({embed: {title : `${jour} ${dd}/${mm}`}})
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