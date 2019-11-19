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

function sendRandomNumber(max, multiplicator, hexColor, titre, texte, channel){
    var valeur = Math.floor(Math.random() * (max+1) * multiplicator) 
    if(valeur > max){
        valeur = max
    }
    
    return channel.send({embed: {
        color: hexColor,
        title : titre,
        description: texte + valeur +"%"
    }})
}


//notre "main"
bot.on('ready', function (evt) {
    logger.info("Running")
})

const authUserId = ["112632359207108608", "230698146630598656", "216919708560130048"]
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
messByID.set("112632359207108608", "Le plus beau ! :smirk:") //Flo
messByID.set("211533618177245188", "La femme de l'homme parfait") //Rytoka
messByID.set("468492284384509963", "La plus bonne ! ❤️") //Axelle
messByID.set("289974845721018368", "Le suisse") //Reweaxs
messByID.set("272360638741741570", "Le beauf <:diego:587410993500520484>") //Diego
messByID.set("230698146630598656", "Le plus fort ! :open_mouth:") // Pata
messByID.set("634330412881281054", "Qu'est-ce que tu veux ? :unamused:") //TheRealBot
messByID.set("311176545383219202", "L'homme parfait :heart_eyes:") //Didou
messByID.set("302898536356511745", "Le plus déco ...") //o4
messByID.set("348302437117067286", "On se capte dans 3 ans :smirk: :stuck_out_tongue_winking_eye: :eggplant:") //Mady

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
    }else if(texte.startsWith("!gay")){
        var userId = message.author.id
        var textToSend = "<@" + userId +">, tu es gay à "
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            var args = texte.split(" ")
            userId = message.mentions.users.firstKey(undefined)
            textToSend = "<@" + userId +"> est gay à "
        }
        var multiplicator = 1
        if(userId === "302898536356511745"){ //o4
            multiplicator = 1.2
        }else if(userId === "300246251834834945"){ //titouan
            multiplicator = 1.4
        }else if(authUserId.includes(userId)){
            multiplicator = 0.8
        }       
        sendRandomNumber(100, multiplicator, 0xFF69B4, "Gay Rate Machine", textToSend, message.channel)
    }else if(texte.startsWith("!waifu")){
        var userId = message.author.id
        var textToSend = "<@" + userId +">, tu es une waifu à "
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            var args = texte.split(" ")
            userId = message.mentions.users.firstKey(undefined)
            textToSend = "<@" + userId +"> est une waifu à "
        }
        var multiplicator = 1
        if(userId === "300246251834834945"){ //titouan
            multiplicator = 0.6
        }else if(authUserId.includes(userId)){
            multiplicator = 1.3
        }       
        sendRandomNumber(100, multiplicator, 0x00CED1, "Waifu Power ❤️", textToSend, message.channel)
    }else if(texte.startsWith("!penis")){
        var userId = message.author.id
        var textToSend = "Voici la taille de ton pénis, <@" + userId +"> :\n"
        if(texte.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
            var args = texte.split(" ")
            userId = message.mentions.users.firstKey(undefined)
            textToSend = "Voici la taille du pénis de <@" + userId +"> :\n"
        }
        var cpt = Math.floor(Math.random() * 20) + 1
        textToSend += "8"
        for (var i=1; i < cpt; i++) {
          textToSend += "="
        }
        textToSend += "D"
        
        message.channel.send({embed: {
            color: 0xFF7F50,
            title : "Ferrara's Machine",
            description: textToSend
        }})
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
    }else if(texte === "!miroir"){
        var rand = Math.random()
        var tag
        if(rand<0.25){
            tag = "<@287712199827521536>" //cécilia
        }else if(rand<0.5){ 
            tag = "<@348302437117067286>"//océane
        }else if(rand<0.75){  
            tag = "<@211533618177245188>"//shannel
        }else{
            tag = "<@468492284384509963>"//axelle
        } 
        message.channel.send({embed: {
            color: 0x7FFF00,
            title : "Miroir miroir...\nDis-moi qui est la plus bonne",
            description: "La plus bonne est " + tag + " !"
        }})
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
    }else if(texte === "simple" && message.author !== bot.user){
        message.channel.send("basique")
    }else if(texte === "basique" && message.author !== bot.user){
        message.channel.send("simple")
    }else{
        //includes
        if(texte.includes("@everyone")){
            message.reply("nique ta mère avec ton tag everyone !")
        }else if(texte.includes("@here")){
            message.reply("nique ta mère avec ton tag here !")
        }else if(texte.includes(" bot ") || texte === "bot" || texte.startsWith("bot ") || texte.endsWith(" bot")){
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
            var tagId = message.mentions.users.firstKey(undefined)
            if(messByID.has(tagId)){
                message.channel.send(messByID.get(tagId))
            }
        }
    }
})
