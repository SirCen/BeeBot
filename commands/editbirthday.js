var moment = require('moment');

module.exports = {
    name: 'editbirthday',
    description: 'Edits a birthday in the database!',
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

        var found = false;
        for (i = 0; i < result.length; i++) {
            if (result[i].WhoAt.toUpperCase() == args[0].toUpperCase()) {
                found = true;
            }
        }
        if(found == false) return message.channel.send("Birthday not found!")

        connection.query(`UPDATE \`${message.guild.id}\` SET Who = '${args[1]}', Date = '${args[2]}' WHERE WhoAt = '${args[0]}'`, function (err, result, fields) {
            if (err) message.reply("INSERTION ERROR:" + err);
            return message.channel.send("**" + args[1] + "**" + "'s birthday has been edited!");
        });


    },
};