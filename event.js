require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    planning_lol: "677556140913197057",
    team_lol: "674359086636072994"
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function envoieJours(chan){
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    
    const today = new Date()
    let cpt = 1

    for await(let jour of jours){
        let date = today.addDays((cpt++))
        let dd = String(date.getDate()).padStart(2, '0')
        let mm = String(date.getMonth() + 1).padStart(2, '0')
        
        chan.send({embed: {title : `${jour} - ${dd}/${mm}`}})
        .then(msg => {msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => msg.react("🕐"))
            .then(() => msg.react("➖"))
        })
    }
}

async function clear(chan) {
    const fetched = await chan.fetchMessages({limit: 99});
    chan.bulkDelete(fetched);
}

function getDayliMessage(bot) {
    const chan = bot.channels.get(channelsID.planning_lol)
    const today = new Date()
    let dd = String(today.getDate() + 2).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')

    chan.fetchMessages({ limit: 99 }).then(messages => {
        messages.forEach(function(msg){
            msg.embeds.forEach(function(element){     
                if(element.title.endsWith(` - ${dd}/${mm}`)){
                    return msg
                }
            })
        })
    })
}

module.exports = class Event{
    static eventPlanning(bot){
        const chan = bot.channels.get(channelsID.planning_lol)
        
        let messageEmbed = new Discord.RichEmbed()
            .setTitle("Planning Team-LoL")
            .addField("Pas là ?", "Expliquez votre absence (et son jour) en dessous du planning...")
            .addField("En retard ?", "Réagissez avec l'emote horloge et donnez une explication afin de savoir combien de temps vous allez mettre...")
            .setColor("#FF9F33")

        clear(chan)
        .then(() => chan.send(messageEmbed))
        .then(() => envoieJours(chan))
        .then(() => chan.send("@everyone"))
    }

    static eventJour(bot){
        const chan = bot.channels.get(channelsID.team_lol)
        const msg = getDayliMessage(bot)
        
        if(msg.reactions.find(val => val.name === "❌").count > 1){
            console.log("NON")
        }else{
            console.log("OUI")
        }
    }
}