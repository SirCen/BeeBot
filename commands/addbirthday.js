var moment = require('moment');
const { Message } = require('discord.js');
module.exports = {
    name: 'addbirthday',
    description: 'Add a birthday to the database!',
    length: 3,
    args: true,
    usage: '<User> <Name> <MMDDYYYY>',
    execute(message, args, result, connection) {

        if (!message.mentions.users.first()) return message.channel.send("Invalid @");

        var date = args[2];
        var formateddate = moment(args[2], "MMDDYYYY").format("MMM Do YYYY");

        if (date.length != 8) return message.reply("Invalid Date Length");

        if (!moment(formateddate, "MMM Do YYYY").isValid()) return message.reply("Invalid Date");

        if (moment(formateddate, "MMM Do YYYY").year() >= moment().year() + 1) return message.reply("Invalid Year");

        if (moment(formateddate, "MMM Do YYYY").year() < 1900) return message.reply("Invalid Year: Below 1900");

        for (i = 0; i < result.length; i++) {
            if (result[i].Who == args[0]) {
                return message.channel.send("User's Birthday Already Added");
            }
        }

        connection.query(`INSERT INTO \`${message.guild.id}\` (WhoAt, Who, Date) VALUES ('${args[0]}','${args[1]}', '${args[2]}')`, function (err, result, fields) {
            if (err) message.reply("INSERTION ERROR:" + err);
            return message.channel.send("**" + args[1] + "**" + "'s birthday has been created and stored!");
        });


    },
};