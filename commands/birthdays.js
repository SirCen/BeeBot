var ArrayList = require('arraylist');
const Discord = require('discord.js');
var moment = require('moment');
module.exports = {
    name: 'birthdays',
    length: 0,
    description: 'List all of the Birthdays inserted!',
    usage: '[command name]',
    execute(message, args, result, connection) {


        var BirthdayList = new ArrayList;
        for (i = 0; i < result.length; i++) {
            BirthdayList.add(
                "**" + result[i].Who + "**" + " " + moment(result[i].Date, "MMDDYYYY").format("MMM Do, YYYY")
            );
        }
        if (BirthdayList.length == 0) {
            return message.channel.send("Birthday list is empty.");
        }
        let Embed = new Discord.RichEmbed()
            .addField("\__**Birthdays\**__", BirthdayList, false)
            .setColor("#4286f4")
        return message.channel.send(Embed)



    },
};