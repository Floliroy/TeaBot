require("dotenv").config()
const Discord = require('discord.js')
const logger = require('winston')
const cron = require('node-cron')
const Pata = require("./modules/pata.js")
const Cira = require("./modules/cira.js")
const Event = require("./modules/event.js")
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
    if(message.author.id === "112632359207108608" && message.content === "!role"){
        message.member.addRole("632663622920962115")
    }
    if(message.content === "<:flolibite:687025812675100720>"){
        message.delete()
    }
    //console.log(`|${message.content}|`)
    Pata.pataMessage(message, bot)
    Cira.ciraMessage(message, bot)
    Event.editPlanning(message, bot)
})

bot.on("messageDelete", (message) => {
    Pata.pataDelete(message, bot)
})

bot.on("guildMemberUpdate", (oldMember, newMember) => {
    if(newMember.id === "112632359207108608" && !newMember.roles.has("632663622920962115")){
        newMember.addRole("632663622920962115")
    }
})
/*cron.schedule("30 22 * * Sunday", function() {
    console.log("-- Cron Planning Started --")
    Event.eventPlanning(bot)
}, {
    timezone: "Europe/Paris"
});

cron.schedule("00 20 * * *", function() {
    console.log("-- Cron Jour Started --")
    Event.eventJour(bot)
}, {
    timezone: "Europe/Paris"
});*/
