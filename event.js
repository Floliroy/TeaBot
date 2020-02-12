require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    team_lol: "674359086636072994",
}

module.exports = class Event{
    static eventMessage(bot){
        const chan = bot.channels.get(channelsID.team_lol)

        return chan.send({embed: {
            title : "Lundi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        }).then(() => chan.send({embed: {
            title : "Mardi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send({embed: {
            title : "Mercredi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send({embed: {
            title : "Jeudi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send({embed: {
            title : "Vendredi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send({embed: {
            title : "Samedi",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send({embed: {
            title : "Dimanche",
        }})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("@everyone"))
    }
}