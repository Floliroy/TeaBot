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
    var texte = message.content.toLowerCase();
    //comparaisons
    if(texte === "ok"){
        if(Math.random()<0.5){
            message.channel.send("sur glace!")
        }else{
            message.channel.send("sur gazon!")
        }
    }else if(texte === "gg"){
        message.channel.send("EZ")
    }else if(texte === "mdr" || texte === "lol"){
        message.channel.send("OH MOI AUSSI CA M'A TUÉ JPP ! XD")
    }else if(texte === "quoi" || texte === "quoi?" || texte === "quoi ?"){
        message.channel.send("T'es de la police ?")
    }else{
        //includes
        if((texte.includes("slt") || texte.includes("salut") || texte.includes("bonjour")) && message.author !== bot.user){
            message.channel.send("slt mon bro :wave:")
        }else if(texte.includes("tg") && message.author !== bot.user){
            message.reply("toi tg!")
        }else if(texte.includes("@everyone")){
            message.reply("nique ta mère avec ton tag everyone !")
        }else if(texte.includes("@here")){
            message.reply("nique ta mère avec ton tag here !")
        }else if(!message.content.includes(" ") && message.mentions.users.first(undefined) === message.mentions.users.last(undefined)){
            //on a un seul tag
            if(message.mentions.users.firstKey(undefined) === "112632359207108608"){ //Flo
                message.channel.send("Le plus beau !")
            }else if(message.mentions.users.firstKey(undefined) === "216919708560130048"){ //Coco
                message.channel.send("Le plus fort !")
            }else if(message.mentions.users.firstKey(undefined) === "230698146630598656"){ //Pata
                message.channel.send("Le plus classe !")
            }else if(message.mentions.users.firstKey(undefined) === "311176545383219202"){ //Didou
                message.channel.send("La plus bonne ❤️")
            }else if(message.mentions.users.firstKey(undefined) === "302898536356511745"){ //o4
                message.channel.send("Le plus déco ...")
            }
        }
    }
})
