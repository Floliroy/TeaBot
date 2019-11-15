require("dotenv").config();
var Discord = require('discord.js')
var logger = require('winston')
//configure le logger
logger.remove(logger.transports.Console)
logger.add(new logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
//Initialise le bot discord
var bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
})
bot.login(process.env.TOKEN)
bot.on("ready", function () {
    bot.user.setActivity("Baiser Patachon").catch(console.error)
})

//renvoi un string contenant un chiffre entre 1 et 100 et une emote associé
function getMessageRandomNumber(){
    var number = Math.floor(Math.random() * 101)
    if (number <= 10){
        return number + " <:lul:633773289394667522>"
    }else if (number <= 20){
        return number + " <:dansGame:633773287331201034>"
    }else if (number <= 30){
        return number + " <:catWhat:633774476856655887>"
    }else if (number <= 40){
        return number + " <:notLikeThis:633773289738731537>"
    }else if (number <= 50){
        return number + " <:carlSmile:633773286412779520>"
    }else if (number <= 60){
        return number + " <:OWO:633772835872964608>"
    }else if (number <= 70){
        return number + " <:pepeEasy:633772829866852365>"
    }else if (number <= 80){
        return number + " <:kreyGasm:633773289591799808>"
    }else if (number <= 90){
        return number + " <:doge:633774476470779934>"
    }else{  
        return number + " <:pogey:633774475241848851>"
    }
}

//crée un event //parametres de la commande :
/*  !event
 *  date (format DD/MM/YYYY)
 *  heure début (format HHhmm)
 *  heure fin (format HHhmm) -> optionelle sinon prendra 2h30 plus tard
 *  type d'event ('flex' ou 'scrim' ou 'tournoi') -> optionel sinon prendra session
 */
function createEvent(args){
    var moment = require('moment')
    moment().format()
    //date
    if(args[1] == null || args[2] == null){return ""}
    var date = args[1]
    var dateSplit = date.split('/')
    var jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    var d = new Date(Date.UTC(dateSplit[2], dateSplit[1]-1, dateSplit[0]))
    var jour = jours[d.getDay()]

    //heure
    var heure = args[2].split('-')
    if(heure[1] == null){
        var pieces = heure[0].split('h')
        var h = parseInt(pieces[0], 10)
        var m = parseInt(pieces[1], 10)
        h += 2
        m += 30
        if(m >= 60){
            m -= 60
            h += 1
        }
        if(h >= 24){
            h-=24
        }

        m = m < 10 ? '0' + m : m; 
        h = h < 10 ? '0' + h : h; 
        heure[1] = h + 'h' + m
    }
    heure = heure[0] + " jusqu'à " + heure[1]

    //type d'event
    var type = ""
    var desc = ""
    if(args[3]==="flex"){
        type = "RANKED FLEX"
        desc = "Ranked Flex on continue de train trankilou !"
    }else if(args[3]==="scrim"){
        type = "SCRIM LoL"
        desc = "Go en Scrim, infos dans <#630451207495876608> !"
    }else if(args[3]==="tournoi"){
        type = "TOURNOI LoL"
        desc = "Go en Tournoi, infos dans <#630451207495876608> !"
    }else{
        type = "SESSION"
        desc = "Go tryhard et s'amuser sur League of Legends !"
    }

    //string de renvoi
    var retour = ""
    retour += `<@&630450019853664302> **[${type}]**` //630450019853664302
    retour += "```" + `${jour} ${date}` + "\n" + `${heure}` + "```" + `${desc}`
    retour += "\n\n`Confirmez votre présence avec les réactions en émote...`"

    return retour
}

//notre "main"
bot.on('ready', function (evt) {
    logger.info("Running")
})
bot.on('message', function (message) {
    // Pour savoir si c'est une commande qui est tapée
    /*if (message.content.startsWith('!')) {
        var args = message.content.split(' ')
        var cmd = args[0]

        switch(cmd) {
            case "!ping":
                message.react("🏓")
                message.channel.send("Pong! :ping_pong:")
                break
            case "!pingAdmin" :
                message.channel.send("Test Ping sur Admin : <@&630450165341487116>")
                break
            case "!pingMembre" :
                message.channel.send("Test Ping sur Membre : <@&630450019853664302>")
                break                
            case "!event" :
                    message.channel.send(createEvent(args)).then(msg => {
                        msg.react("✅")
                            .then(() => msg.react("❌"))
                            .then(() => msg.react("➖"))
                            .then(() => message.delete())
                            .catch(err => console.err("One emoji failed to react"))
                    })
                break
            case "!rand" :
                message.channel.send(getMessageRandomNumber())
                break
        }
    }*/
    
    var texte = message.content.toLowerCase();
    if(texte === "ok"){
        message.channel.send("sur glace!")
    }
    if((texte.includes("slt") || texte.includes("salut") || texte.includes("bonjour")) && message.author !== bot.user){
        message.channel.send("slt mon bro :wave:")
    }
    if(texte.includes("tg") && message.author !== bot.user){
        message.reply("toi tg!")
    }
    if(texte === "gg"){
        message.channel.send("EZ")
    }
    if(texte.includes("@everyone")){
        message.reply("nique ta mère avec ton tag everyone !")
    }
    if(texte.includes("@here")){
        message.reply("nique ta mère avec ton tag here !")
    }
})

//si une réaction est enlevé sous le message du bot (pour les events) il la remet
/*bot.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.author.username === "Bot Teä-P" && user.username !== "Bot Teä-P") {
        if (reaction.users.size < 1) {
            reaction.message.react(reaction.emoji)
        }
    }
})

//si une réaction est ajouté sous un messsage du bot (pour les events) il enleve la sienne pour qu'on ai bien 5 inscrits au total
bot.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.author.username === "Bot Teä-P" && user.username !== "Bot Teä-P") {
        let author = reaction.message.author
        reaction.message.reactions.some(react => {
            react.fetchUsers(1).then(usr => {
            if (usr.size < 3 && usr.has(author.id)) {
                reaction.remove(author.id)
            }
            if (react.emoji !== reaction.emoji) {
                if (usr.has(user.id)) {
                react.remove(user.id)
                }
            }
            })
        })
    }
})*/
