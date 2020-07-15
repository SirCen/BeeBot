//Libraries of somethin
const fs = require('fs')
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
var mysql = require('mysql');

//some magic shit
const beebot = new Discord.Client();
beebot.commands = new Discord.Collection();

//gets commands file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Gets commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    beebot.commands.set(command.name, command);
}

var connection = mysql.createConnection({
    debug: ['ComQueryPacket', 'RowDataPacket'],
    host: 'localhost',
    user: 'admin',
    password: 'Durann31!',
    database: 'birthdays'
});

connection.on("error", (error) => {
    console.log("mysql Error encountered: " + error);
});


connection.connect(function (err) {
    if (err) {
        console.error('error: ' + err.message);
        //Trys to reconnect
        setTimeout(() => {
            connection.connect(function (err) {
                if (err) {
                    console.error('error: ' + err.message);
                }
            });
        }, 120000);

    }
});



beebot.on("guildCreate", guild => {
    let createBirthdays = `CREATE TABLE IF NOT EXISTS \`${guild.id}\` ( WhoAt varchar(255), Who varchar(255), Date varchar(255));`;
    connection.query(createBirthdays, function (err, results, fields) {
        if (err) console.log(err.message);

    });

});

beebot.on("guildDelete", guild => {
    let removeEvents = `DROP TABLES \`${guild.id}\``;
    connection.query(removeEvents, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

});

//This shit ready
beebot.on('ready', message => {
    console.log('I am ready!');
});

//Waits for the message
beebot.on('message', message => {
    //Checks every message, is bee?
    if (message.content.includes("bee") && message.content.length == 3) {
        message.react('🐝');
    }
    //If it starts with ! -> command
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //Wrong args because people are fucking stupid
    const command = beebot.commands.get(commandName) || beebot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`
        if (command.usage) {
            reply += `\n**Usage**: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if (args.length != command.length) {
        return message.reply("Invalid Arguments");
    };
  
    try {
        connection.query(`SELECT * FROM \`${message.guild.id}\``, function (err, result, fields) {
            if (err) {
                //If bot was offline and someone added bot to server
                if (err.code == 'ER_NO_SUCH_TABLE') {
                    let createBirthdays = `CREATE TABLE IF NOT EXISTS \`${message.guild.id}\` ( WhoAt varchar(255), Who varchar(255), Date varchar(255));`;
                    connection.query(createBirthdays, function (err, results, fields) {
                        if (err) console.log(err.code);
                    });
                }
                else console.log(err);
            }
            command.execute(message, args, result, connection);
        });
    } catch (error) {
        console.error(error);
        message.reply('There was an error');
    }
});
//Logins in the bot
beebot.login(token);