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
    bot.user.setActivity("Soulever o4").catch(console.error)
})

/*
To see the previous implemented functions go to the initial commit
Theses functions were not used anymore so i removed them from the code
*/

//notre "main"
bot.on('ready', function (evt) {
    logger.info("Running")
})
bot.on('message', function (message) {
    /*if(!message.content.includes(" ") && message.mentions.users.first() === message.mentions.users.last()){
        //on a un seul tag
        message.reply("TAG")
        if(message.mentions.users.firstKey("112632359207108608")){
            message.channel.send("Le plus beau !")
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
    if(texte === "mdr" || texte === "lol"){
        message.channel.send("OH MOI AUSSI CA M'A TUÉ JPP ! XD")
    }
    if(texte === "quoi" || texte === "quoi?" || texte === "quoi ?"){
        message.channel.send("T'es de la police ?")
    }
})
