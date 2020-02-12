require("dotenv").config()
const Discord = require('discord.js')

const serversID={
    pata: "342389922491269122",
}
const channelsID={
    team_lol: "674359086636072994",
}
const usersId = {
    flo: "112632359207108608",
    pata: "230698146630598656",
    coco: "216919708560130048",
}

const authUserId = [usersId.flo, usersId.pata, usersId.coco]

module.exports = class Event{
    static eventMessage(message, bot){
        if(message.channel.guild.id != serversID.pata){return}
        if(message.channel.id != channelsID.team_lol){return}
        if(!authUserId.includes(message.author.id)){return}
        if(message.content != "!event"){return}

        const chan = message.channel

        return chan.send("Lundi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        }).then(() => chan.send("Mardi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("Mercredi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("Jeudi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("Vendredi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("Samedi")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
        })).then(() => chan.send("Dimanche")
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➖"))
            .then(() => message.delete())
        }))
    }
}