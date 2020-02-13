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
    console.log("-- Running --")
    bot.user.setActivity("conquérir le monde.")
})

bot.on('message', function (message) {
    Pata.pataMessage(message, bot)
    Cira.ciraMessage(message, bot)
    
    if(message.content.toLowerCase() === "!test"){
        let channel = bot.channels.get("677556140913197057")
        channel.fetchMessages({ limit: 99 }).then(messages => {
            messages.embeds.forEach(function(element){     
                console.log("|" + element.title + "|")
            })
        })
    }

})

cron.schedule("30 22 * * Sunday", function() {
    console.log("-- Cron Started --")
    Event.eventMessage(bot)
}, {
    timezone: "Europe/Paris"
});
