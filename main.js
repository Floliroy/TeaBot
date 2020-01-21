require("dotenv").config()
const Discord = require('discord.js')
const logger = require('winston')
const BitlyAPI = require('node-bitlyapi')
const Bitly = new BitlyAPI({
	client_id: "BotTeaP",
	client_secret: "Secret"	
})
const GoogleSpreadsheet = require('google-spreadsheet')
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
Bitly.setAccessToken(process.env.BITLY_TOKEN)

/*
To see the previous implemented functions go to the initial commit
Theses functions were not used anymore so i removed them from the code
*/

function sendRandomNumber(max, multiplicator, hexColor, titre, texte, channel){
    let valeur = Math.floor(Math.random() * (max+1) * multiplicator) 
    if(valeur > max){
        valeur = max
    }
    
    return channel.send({embed: {
        color: hexColor,
        title : titre,
        description: texte + valeur + "%"
    }})
}

function doesStringContainList(text, list){    
    let retour = 0
    list.forEach(function(element){     
        if(text.includes(element)){
            retour = 1
        }
    })
    return retour
}

//notre "main"
bot.on('ready', function (evt) {
    logger.info("Running")
})

const serversID={
    cira: "669236647765999676",
}
const usersId = {
    titouan: "300246251834834945",
    o4: "302898536356511745",
    flo: "112632359207108608",
    shannel: "211533618177245188",
    axelle: "468492284384509963",
    reweaxs: "289974845721018368",
    diego: "272360638741741570",
    pata: "230698146630598656",
    thebot: "634330412881281054",
    didou: "311176545383219202",
    cecilia: "287712199827521536",
    oceane: "348302437117067286",
    coco: "216919708560130048",
}
const authUserId = [usersId.flo, usersId.pata, usersId.coco]
const messExact = new Map()
messExact.set("gg", "EZ")
messExact.set("prozis", "**ALDE10**")
messExact.set("jtm", "Moi aussi je m'aime...")
messExact.set("feu vert", "La patte de l'expert")
messExact.set("mdr", "OH MOI AUSSI CA M'A TUÉ JPP ! :rofl:")
messExact.set("lol", "OH MOI AUSSI CA M'A TUÉ JPP ! :rofl:")
messExact.set("m'énerve pas", "je vais m'énerver")
messExact.set("m'enerve pas", "je vais m'énerver")
messExact.set("m énerve pas", "je vais m'énerver")
messExact.set("les produits laitiers", "sont nos amis pour la vie :musical_note:")
messExact.set("les produits laitier",  "sont nos amis pour la vie :musical_note:")
messExact.set("les produit laitier",   "sont nos amis pour la vie :musical_note:")
const messByID = new Map()
messByID.set(usersId.flo, "Le plus beau ! :smirk:")
messByID.set(usersId.shannel, "La femme de l'homme parfait")
messByID.set(usersId.axelle, "La plus bonne ! ❤️")
messByID.set(usersId.reweaxs, "Le suisse")
messByID.set(usersId.diego, "Le beauf <:diego:587410993500520484>")
messByID.set(usersId.pata, "Le plus fort ! :open_mouth:")
messByID.set(usersId.thebot, "Qu'est-ce que tu veux ? :unamused:")
messByID.set(usersId.didou, "L'homme parfait :heart_eyes:")
messByID.set(usersId.o4, "Le plus déco ...")
//messByID.set(usersId.oceane, "On se capte dans 2 ans :smirk: :stuck_out_tongue_winking_eye: :eggplant:")
const rapportList = ["baise","baisé","sex","suce","sucé","penis","pénis","gay","lesbien","chatte","vagin","69","nude","bdsm","bz","fesse","boob","bite","cul","gasm","<3","porno","zizi","jtm"]

bot.on('message', function (message) {   
    if(message.author === bot.user){return}
    if(message.channel.guild.id === serversID.cira){return}
    
    const texte = message.content.toLowerCase()
    const args = texte.split(" ")
    let userId = message.author.id
    
    //comparaisons
    if(texte.includes("g2")){
        message.react("3️⃣")
        .then(() => message.react("➖"))
        .then(() => message.react("0️⃣"))
    }
    if(message.author.id === usersId.oceane && doesStringContainList(texte, rapportList) === 1){
        message.react("🍆")
    }
    
    if(messExact.has(texte)){
        return message.channel.send(messExact.get(texte))
    }
    
    switch (texte){
        case "ok":
            if(Math.random()<0.5){
                return message.channel.send("sur glace!")
            }else{
                return message.channel.send("sur gazon!")
            }
        case "!miroir":
            const rand = Math.random()
            let tag
            if(rand<0.25){
                tag = `<@${usersId.cecilia}>` //cécilia
            }else if(rand<0.5){ 
                tag = `<@${usersId.oceane}>`//océane
            }else if(rand<0.75){  
                tag = `<@${usersId.shannel}>`//shannel
            }else{
                tag = `<@${usersId.axelle}>`//axelle
            } 
            return message.channel.send({embed: {
                color: 0x7FFF00,
                title : "Miroir miroir...\nDis-moi qui est la plus bonne",
                description: `La plus bonne est ${tag} !`
            }})
        case "!besch":
            message.delete()
            if(authUserId.includes(message.author.id)){
                return message.channel.send("Apprends à écrire fdp")
            } return
        case "!besch+":
            message.delete()
            if(authUserId.includes(message.author.id)){
                return message.channel.send("Gros... Même o4 fait moins de fautes :worried:")
            } return
        case "simple": 
            return message.channel.send("basique")
        case "basique":
            return message.channel.send("simple")
        case "!afk":
            message.delete()
            if(message.member.nickname != null){
                if(!message.member.nickname.includes(" (AFK)")){
                    return message.member.setNickname(message.member.nickname.concat(" (AFK)"))
                }
            }else{
                return message.member.setNickname(message.author.username.concat(" (AFK)"))
            } return
        case "!re":
            message.delete()
            if(message.member.nickname != null){
                if(message.member.nickname.includes(" (AFK)")){
                    return message.member.setNickname(message.member.nickname.replace(" (AFK)", ""))
                }
            } return
    }
    
    if(texte.startsWith("!gay")){
        let textToSend = `<@${userId}>, tu es gay à `
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            userId = message.mentions.users.firstKey(undefined)
            textToSend = `<@${userId}> est gay à `
        }
        
        let multiplicator = 1
        if(userId === usersId.o4){
            multiplicator = 1.2
        }else if(userId === usersId.titouan){
            multiplicator = 1.4
        }else if(authUserId.includes(userId)){
            multiplicator = 0.8
        }       
        return sendRandomNumber(100, multiplicator, 0xFF69B4, "Gay Rate Machine", textToSend, message.channel)
    }else if(texte.startsWith("!waifu")){
        let textToSend = `<@${userId}>, tu es une waifu à `
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            userId = message.mentions.users.firstKey(undefined)
            textToSend = `<@${userId}> est une waifu à `
        }
        
        let multiplicator = 1
        if(userId === usersId.titouan){
            multiplicator = 0.6
        }else if(authUserId.includes(userId)){
            multiplicator = 1.3
        }       
        return sendRandomNumber(100, multiplicator, 0x00CED1, "Waifu Power ❤️", textToSend, message.channel)
    }else if(texte.startsWith("!penis")){
        let textToSend = `Voici la taille de ton pénis, <@${userId}> :\n`
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            userId = message.mentions.users.firstKey(undefined)
            textToSend = `Voici la taille du pénis de <@${userId}> :\n`
        }
        
        const cpt = Math.floor(Math.random() * 17) + 1
        textToSend += "8"
        for (let i=1; i <= cpt; i++) {
          textToSend += "="
        }
        textToSend += "D"
        
        return message.channel.send({embed: {
            color: 0xFF7F50,
            title : "Ferrara's Machine",
            description: textToSend
        }})
    }else if(texte === "quoi" || texte === "quoi?" || texte === "quoi ?"){
        if(Math.random()<0.5){
            return message.channel.send("T'es de la police ?")
        }else{
            return message.channel.send("feur")
        }
    }else{
        //includes
        if(texte.includes("@everyone")){
            return message.reply("nique ta mère avec ton tag everyone !")
        }else if(texte.includes("@here")){
            return message.reply("nique ta mère avec ton tag here !")
        }else if(texte.includes(" bot ") || texte === "bot" || texte.startsWith("bot ") || texte.endsWith(" bot")){
            if(authUserId.includes(message.author.id)){
                return message.reply("tu parles de moi bg ?")
            }else{
                return message.reply("d'où tu parles de moi fdp !")
            }
        }else if(message.mentions.users.firstKey(undefined) === usersId.coco){ //Coco
            return message.channel.send("Tag pas Coco, ça lui casse les couilles !")
        }else if((texte.includes("slt") || texte.includes("salut") || texte.includes("bonjour")) && message.author !== bot.user){
            return message.channel.send("slt mon bro :wave:")
        }else if(texte.includes("tg") && message.author !== bot.user){
            return message.reply("toi tg!")
        }else if(!message.content.includes(" ") && message.mentions.users.first(undefined) === message.mentions.users.last(undefined)){
            //on a un seul tag
            const tagId = message.mentions.users.firstKey(undefined)
            if(messByID.has(tagId)){
                return message.channel.send(messByID.get(tagId))
            }
        }
    }
})

const doc = new GoogleSpreadsheet('1WfqDf1dTnhcmusyHsbPgcfmmGIBzlFG_Eu1eDQ9BB_s')
bot.on('message', function (message) {
    if(message.channel.guild.id != serversID.cira){return}
    if(!authUserId.includes(message.author.id)){return}
    let jour, matiere, description, imageURL, lien
    const options = {
        'min-row': 1,
        'max-row': 3,
        'min-col': 1,
        'max-col': 5,
        'return-empty': true,
    }

    let sheet
    const creds = {
        client_email: process.env.GOOGLE_EMAIL, 
        private_key: process.env.GOOGLE_TOKEN
    }
    doc.useServiceAccountAuth(creds, function(err) {
        console.log("Je me suis authentifié")
        doc.getInfo(function(err, info) {
            console.log('Loaded doc: '+info.title+' by '+info.author.email)
            sheet = info.worksheets[0]
            sheet.getCells(options, function(err, cells) {
                console.log("Je lis atm")
                jour = cells[0]
                matiere = cells[1]
                description = cells[2]
                imageURL = cells[3]
                lien = cells[4]
            })
        })
    })

    if(message.content === "test" && message.channel.guild.id === serversID.cira){
        let messageEmbed = new Discord.RichEmbed()
            .addField("Date", jour)
            .addField("Matière", matiere)
            .addField("Travail à faire", description)
            .addField("Image", imageURL)
            .addField("Lien", lien)
            .setColor("#CE00E5")
            .setThumbnail("https://www.icone-png.com/png/52/52496.png")
        message.channel.send(messageEmbed)
    }

    /*if(message.content === "bitly" && message.channel.guild.id === serversID.cira){
        Bitly.shortenLink("https://www.google.com/search?q=javascript+icone&rlz=1C1MSIM_enFR806FR806&sxsrf=ACYBGNQtHFevzTMYg-a25x2vA1dZJJD42Q:1579631890585&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjQgtutq5XnAhXQxIUKHaKvAnYQ_AUoAXoECA0QAw&cshid=1579631938432031&biw=2560&bih=937", function(err, results) {
            const bitlink = JSON.parse(results)
            const finalURL = bitlink.data.url
            message.reply(finalURL)
        })
    }*/
})
