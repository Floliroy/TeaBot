require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    team_lol: "674359086636072994",
}

async function envoieJours(chan){
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

    for await(let jour of jours){
        chan.send({embed: {title : `${jour}`}})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })
    }
}

module.exports = class Event{
    static eventMessage(bot){
        const chan = bot.channels.get(channelsID.team_lol)
        
        envoieJours(chan)
        .then(() => chan.send("@everyone"))
    }
}