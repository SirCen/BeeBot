var moment = require('moment');
module.exports = {
	name: 'addbirthday',
    description: 'Add a birthday to the database!',
    length: 2,
    args: true,
    usage: '<User> <MMDDYYYY>',
	execute(message, args, beebot) {

        if(message.mentions.users)console.log("mentions");
        let who = args[0];
        let date = args[1];
        if(date.length != 8) return message.reply("Invalid Date");
        let formateddate = moment(args[1], "MMDDYYYY").format("MMM Do YYYY");
        if(moment(formateddate,"MMM Do YYYY").month() > 12) return message.reply("Invalid Month");
        if(moment(formateddate,"MMM Do YYYY").year() >= moment().year()+1) return message.reply("Invalid Year");
        // const list = beebot.guilds.get(message.guild.id); 
        // list.members.forEach(member => {
        //     if(who.includes(member.user.id)){
        //         console.log("Match");
        //     }
        //     else()
        // }); 
        //console.log(who);
        return message.channel.send(formateddate);

        // connection.query(`SELECT Name, Date, Time FROM \`${message.guild.id}\``, function (err, result, fields) {
        //     if (err) message.reply(err);
        //     for(i = 0; i < result.length; i++){
        //         if(result[i].Name.toUpperCase() == args[0].toUpperCase()){
        //             return message.reply('Already a scheduled event');
        //         }
        //     }
        //     message.guild.createRole({
        //         name: "EB-" + args[0],
        //         color: '#ff9500',
        //         mentionable: true,
        //     })
        //     // WILL NOTIFY
        //     if(notify.toUpperCase() == "T"){
                
        //         connection.query(`INSERT INTO \`${message.guild.id}\` (Name, Date, Time, Notify, Description, Owner, Timestamp, ChannelID, Initiated) VALUES ('${args[0]}', '${args[1]}', '${args[2]}', '${notify.toUpperCase()}', '${desc}', ${message.author.id}, ${message.createdTimestamp}, '${message.channel.id}', 'F')`, function (err, result, fields) {
        //             if (err) message.reply(err + " T Error");
        //             message.channel.send("**"+args[0]+"**" + " event has been scheduled and will notify those who join!");
        //         });
                
        //     }
        //     //WILL NOT NOTIFY
        //     else{
        //         connection.query(`INSERT INTO \`${message.guild.id}\` (Name, Date, Time, Notify, Description, Owner, Timestamp, ChannelID, Initiated) VALUES ('${args[0]}', '${args[1]}', '${args[2]}', '${notify.toUpperCase()}', '${desc}', ${message.author.id}, ${message.createdTimestamp}, '${message.channel.id}', 'F')`, function (err, result, fields) {
        //             if (err) message.reply(err + " F Error");
        //             message.channel.send("**"+args[0]+"**" + " event has been scheduled!");
                    
        //         });

        //     }
            
        //   });
        
	},
};