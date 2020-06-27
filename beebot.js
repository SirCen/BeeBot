//Libraries of somethin
const fs = require('fs')
const Discord = require('discord.js');
const {prefix,token} = require('./config.json');

//some magic shit
const beebot = new Discord.Client();
beebot.commands = new Discord.Collection();

//gets commands file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Error if bot cant turn on
beebot.on( "error", (error) => {
	console.log( "Error encountered: " + error );
});
   
//Gets commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	beebot.commands.set(command.name, command);
}

//This shit ready
beebot.on('ready', message => {
    console.log('I am ready!');
    var channelthis = beebot.channels.get('518472414519230467');
    channelthis.send("Noé decided to turn my ass off to change whatevers inside me, and now im a whole new bee. Beerazy")
});

//Waits for the message
beebot.on('message',message => {
    //Checks every message, is bee?
    if(message.content.includes("bee") && message.content.length == 3){
        message.react('🐝');
    }
    //If it starts with ! -> command
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //Wrong args because people are fucking stupid
    const command = beebot.commands.get(commandName) || beebot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if(command.args && !args.length){
        let reply = `You didn't provide any arguments, ${message.author}!`
        if(command.usage){
            reply += `\n**Usage**: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if(args.length != command.length){
        return message.reply("Invalid Arguments");
    };
    //Runs the command
    try{  
        command.execute(message, args,beebot);  
    }catch(error){
        console.error(error);
        message.reply('There was an error');
    } 

});

//Logins in the bot
beebot.login(token);