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
    bot.user.setActivity("Soulever DiegoPisse").catch(console.error)
})

/*
To see the previous implemented functions go to the initial commit
Theses functions were not used anymore so i removed them from the code
*/

//notre "main"
bot.on('ready', function (evt) {
    logger.info("Running")
})

const authUserId = ["112632359207108608", "230698146630598656", "216919708560130048"]
const messExact = new Map()
messExact.set("gg", "EZ")
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

bot.on('message', function (message) {    
    var texte = message.content.toLowerCase();
    //comparaisons
    if(texte.includes("g2")){
        message.react("3️⃣")
        .then(() => message.react("➖"))
        .then(() => message.react("0️⃣"))
    }
    
    if(messExact.has(texte)){
        message.channel.send(messExact.get(texte))
    }else if(texte === "ok"){
        if(Math.random()<0.5){
            message.channel.send("sur glace!")
        }else{
            message.channel.send("sur gazon!")
        }
    }else if(texte === "quoi" || texte === "quoi?" || texte === "quoi ?"){
        if(Math.random()<0.5){
            message.channel.send("T'es de la police ?")
        }else{
            message.channel.send("feur")
        }
    }else if(texte === "!besch"){
        message.delete()
        if(authUserId.includes(message.author.id)){
            message.channel.send("Apprends à écrire fdp")
        }
    }else if(texte === "!besch+"){
        message.delete()
        if(authUserId.includes(message.author.id)){
            message.channel.send("Gros... Même o4 fait moins de fautes :worried:")
        }
    }else{
        //includes
        if(texte.includes("@everyone")){
            message.reply("nique ta mère avec ton tag everyone !")
        }else if(texte.includes("@here")){
            message.reply("nique ta mère avec ton tag here !")
        }else if(texte.includes(" bot ") || texte === "bot"){
            if(authUserId.includes(message.author.id)){
                message.reply("tu parles de moi bg ?")
            }else{
                message.reply("d'où tu parles de moi fdp !")
            }
        }else if(message.mentions.users.firstKey(undefined) === "216919708560130048"){ //Coco
                message.channel.send("Tag pas Coco, ça lui casse les couilles !")
        }else if((texte.includes("slt") || texte.includes("salut") || texte.includes("bonjour")) && message.author !== bot.user){
            message.channel.send("slt mon bro :wave:")
        }else if(texte.includes("tg") && message.author !== bot.user){
            message.reply("toi tg!")
        }else if(!message.content.includes(" ") && message.mentions.users.first(undefined) === message.mentions.users.last(undefined)){
            //on a un seul tag
            if(message.mentions.users.firstKey(undefined) === "112632359207108608"){ //Flo
                message.channel.send("Le plus beau !")
            }else if(message.mentions.users.firstKey(undefined) === "468492284384509963"){ //Axelle
                message.channel.send("La plus bonne ! ❤️")
            }else if(message.mentions.users.firstKey(undefined) === "289974845721018368"){ //Reweaxs
                message.channel.send("Le suisse")
            }else if(message.mentions.users.firstKey(undefined) === "272360638741741570"){ //Diego
                message.channel.send("Le beauf <:diego:587410993500520484>")
            }else if(message.mentions.users.firstKey(undefined) === "230698146630598656"){ //Pata
                message.channel.send("Le plus fort !")
            }else if(message.mentions.users.firstKey(undefined) === "634330412881281054"){ //TheRealBot
                message.channel.send("Qu'est-ce que tu veux ?")
            }else if(message.mentions.users.firstKey(undefined) === "311176545383219202"){ //Didou
                message.channel.send("L'homme parfait")
            }else if(message.mentions.users.firstKey(undefined) === "302898536356511745"){ //o4
                message.channel.send("Le plus déco ...")
            }
        }
    }
})
