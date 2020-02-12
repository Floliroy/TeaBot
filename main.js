require("dotenv").config()
const Discord = require('discord.js')
const logger = require('winston')
//configure le logger
logger.remove(logger.transports.Console)
logger.add(new logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
//Initialise le bot discord
const bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
})
bot.login(process.env.TOKEN)
bot.on("ready", function () {
    bot.user.setActivity("conquérir le monde.").catch(console.error)
})

bot.on('message', function (message) {   
    const Pata = require("./pata.js")
    const Cira = require("./cira.js")
    
    Pata.ciraMessage(message, bot)
    Cira.ciraMessage(message, bot)
})
