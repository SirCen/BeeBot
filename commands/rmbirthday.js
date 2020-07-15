
module.exports = {
    name: 'rmbirthday',
    description: 'Removes a birthday to the database!',
    length: 1,
    args: true,
    usage: '<Name>',
    execute(message, args, beebot, connection) {

        connection.query(`SELECT Who, WhoAt, Date FROM \`${message.guild.id}\``, function (err, result, fields) {
            var i = 0;
            while(i < result.length){
                if(result[i].Who == args[0]){
                    message.channel.send("Deleted "+ result[i].Who +"'s birthday from the list.");
                    connection.query(`DELETE FROM \`${message.guild.id}\` WHERE WhoAt = '${result[i].WhoAt}' `, function (err, result, fields) {
                        if (err) message.reply(err);
                    });
                    return;
                }
                i++;
            }
            message.channel.send("Name not found!")

        });
    }
}