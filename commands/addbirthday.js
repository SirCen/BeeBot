var moment = require('moment');
module.exports = {
	name: 'addbirthday',
    description: 'Add a birthday to the database!',
    length: 2,
    args: true,
    usage: '<User> <MMDDYYYY>',
	execute(message, args, beebot,connection) {

        if(message.mentions.users)console.log("mentions");
        let who = args[0];
        let date = args[1];
        if(date.length != 8) return message.reply("Invalid Date");
        let formateddate = moment(args[1], "MMDDYYYY").format("MMM Do YYYY");
        if(moment(formateddate,"MMM Do YYYY").month() > 12) return message.reply("Invalid Month");
        if(moment(formateddate,"MMM Do YYYY").year() >= moment().year()+1) return message.reply("Invalid Year");

        //Check if person is in database


        connection.query(`INSERT INTO \`${message.guild.id}\` (Who, Date) VALUES ('${args[0]}', '${args[1]}')`, function (err, result, fields) {
                    if (err) message.reply(err + " T Error");
                    message.channel.send("**"+args[0]+"**" + " event has been scheduled and will notify those who join!");
        });

            

        
	},
};