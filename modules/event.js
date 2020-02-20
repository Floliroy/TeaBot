require("dotenv").config()
const Discord = require('discord.js')

const channelsID={
    planning_lol: "677556140913197057",
    team_lol: "674359086636072994"
}
const serversID={
    pata: "342389922491269122",
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

function upperFirstLetter(chaine) {  
    return chaine[0].toUpperCase() + chaine.slice(1); 
} 

async function envoieJours(chan){
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

async function getDayliMessage(bot) {
    const chan = bot.channels.get(channelsID.planning_lol)
    const today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')

    let retour

    await chan.fetchMessages({ limit: 99 }).then(messages => {
        messages.forEach(function(msg){
            msg.embeds.forEach(function(element){
                if(element.title.endsWith(` - ${dd}/${mm}`)){
                    console.log(element.title)
                    retour = msg
                }
            })
        })
    })

    return retour
}

async function getMessageByDay(bot, day){
    const chan = bot.channels.get(channelsID.planning_lol)

    let retour

    await chan.fetchMessages({ limit: 99 }).then(messages => {
        messages.forEach(function(msg){
            msg.embeds.forEach(function(element){
                if(element.title.startsWith(day)){
                    retour = msg
                }
            })
        })
    })

    return retour
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

    static async eventJour(bot){
        const chan = bot.channels.get(channelsID.team_lol)
        const msg = await getDayliMessage(bot)

        if(msg != null && msg.reactions.get("❌").count > 1){
            let messageEmbed = new Discord.RichEmbed()
            .setTitle("Soirée annulée, il manque quelqu'un...")
            .setColor("#FF9F33")

            chan.send("@everyone")
            .then(() => chan.send(messageEmbed))
            
        }else if(msg != null){
            let messageEmbed = new Discord.RichEmbed()
            .setTitle("Départ ce soir entre 21h30 et 22h00 !")
            .setColor("#FF9F33")
            
            chan.send("@everyone")
            .then(() => chan.send(messageEmbed))
        }
    }

    static async editPlanning(message, bot){
        //On vérifie que ce soit un message que l'on doit traiter
        if(message.channel.guild.id != serversID.pata){return}
        if(message.channel.id != channelsID.planning_lol && message.channel.id != channelsID.team_lol){return}
        if(!message.content.startsWith("!")){return}
        
        //On vérifie qu'on a bien un jour
        const args = message.content.split(" ")
        const jour = upperFirstLetter(args[0].toLowerCase().replace("!",""))
        if(!jours.includes(jour)){return}

        //On recrée le message qui veut etre ajouté
        args[0] = ""
        let newField = ""
        args.forEach(function(element){
            if(element.length >=3 && element.startsWith(":") && element.endsWith(":")){
                element = element.replace(":", "").replace(":", "")
                const emote = bot.emojis.find(emoji => emoji.name === element)
                element = `${emote}`
            }
            newField += element + " "
        })

        //On récupère le message qui souhaite etre modifié
        let messageToEdit = await getMessageByDay(bot, jour)
        let embedMessageToEdit = messageToEdit.embeds[0]
        let embedFields = embedMessageToEdit.fields

        //On récupère tous les fields du message
        let fieldsToWrite = new Map();
        fieldsToWrite.set(message.author.username, newField)
        embedFields.forEach(function(field){     
            if(!fieldsToWrite.has(field.name)){
                fieldsToWrite.set(field.name, field.value)
            }
        })

        //On crée et remplie notre nouvel embed
        let messageEmbed = new Discord.RichEmbed()
            .setTitle(embedMessageToEdit.title)

        fieldsToWrite.forEach(function(value, key, map) {
            messageEmbed.addField(key,value)
        })

        message.delete()
        return messageToEdit.edit(messageEmbed)
    }
}