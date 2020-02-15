require("dotenv").config()
const Discord = require('discord.js')
const BitlyAPI = require('node-bitlyapi')
const Bitly = new BitlyAPI({
	client_id: "BotTeaP",
	client_secret: "Secret"	
})
Bitly.setAccessToken(process.env.BITLY_TOKEN)
const GoogleSpreadsheet = require('google-spreadsheet')

const serversID={
    cira: "669236647765999676",
}
const channelsID={
    travailCira1: "669237266413125663",
    travailCira2: "669566513350443008",
}
const usersId = {
    flo: "112632359207108608",
    coco: "216919708560130048",
}
const authUserId = [usersId.flo, usersId.coco]

const doc = new GoogleSpreadsheet('1WfqDf1dTnhcmusyHsbPgcfmmGIBzlFG_Eu1eDQ9BB_s')
module.exports = class Cira{
    static ciraMessage(message, bot){
        if(message.channel.guild.id != serversID.cira){return}
        if(!authUserId.includes(message.author.id)){return}
        if(message.content != "!travail"){return}
        
        let sheet
        if(message.channel.id === channelsID.travailCira1){
            sheet = 1
        }else if(message.channel.id === channelsID.travailCira2){
            sheet = 2
        }else{
            return
        }

        let jour, matiere, description, imageURL, lien
        const options = {
            'min-row': 2,
            'max-row': 2,
            'return-empty': true
        }

        const creds = {
            client_email: process.env.GOOGLE_EMAIL, 
            private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
        }
        doc.useServiceAccountAuth(creds, function(err) {
            if (err) console.log(err)

            doc.getCells(sheet, options, function(err, cells) {
                if (err) console.log(err)

                jour = cells[0].value.trim()
                matiere = cells[1].value.trim()
                description = cells[2].value.trim()
                imageURL = cells[3].value.trim()
                lien = cells[4].value.trim()

                if(jour === "" || lien === null || matiere === "" || matiere === null || description === "" || description === null){
                    return message.reply("ERROR: Arguments missing in Google SpreadSheet...")
                }

                message.delete()

                let moment = require('moment')
                moment().format()
                let dateSplit = jour.split('/')
                let jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
                let d = new Date(Date.UTC(dateSplit[2], dateSplit[1]-1, dateSplit[0]))
                jour = `${jours[d.getDay()]} ${jour}`
                
                
                Bitly.shortenLink(lien, function(err, results) {
                    if(lien != "" && lien != null){
                        const bitlink = JSON.parse(results)
                        lien = bitlink.data.url
                    }

                    let messageEmbed = new Discord.RichEmbed()
                        .setTitle(`Matière : ${matiere}`)
                        .setDescription(description)
                        .addBlankField()
                        .addField("Date", jour)
                        .setColor("#738ADB")

                    if(lien != "" && lien != null){
                        messageEmbed.setURL(lien)
                    }
                    if(imageURL != "" && imageURL != null){
                        messageEmbed.setThumbnail(imageURL)
                    }

                    return message.channel.send(messageEmbed)
                })
            })
        })
    }
}