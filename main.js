require("dotenv").config()
const Discord = require('discord.js')
const logger = require('winston')
const cron = require('node-cron')
const Pata = require("./pata.js")
const Cira = require("./cira.js")
const Event = require("./event.js")
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
    Pata.pataMessage(message, bot)
    Cira.ciraMessage(message, bot)
})

cron.schedule("28 12 * * Thursday", function() {
    console.log("-- Cron Started --")
    Event.eventMessage(bot)
    console.log("-- Cron Ended --")
}, {
    timezone: "Europe/Paris"
});
