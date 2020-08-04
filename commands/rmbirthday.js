
module.exports = {
    name: 'rmbirthday',
    description: 'Removes a birthday to the database!',
    length: 1,
    args: true,
    usage: '<Name>',
    execute(message, args, result, connection) {

        var i = 0;
        while (i < result.length) {
            if (result[i].Who.toUpperCase() == args[0].toUpperCase()) {
                message.channel.send("Deleted " + result[i].Who + "'s birthday from the list.");
                connection.query(`DELETE FROM \`${message.guild.id}\` WHERE WhoAt = '${result[i].WhoAt}' `, function (err, result, fields) {
                    if (err) message.reply(err);
                });
                return;
            }
            i++;
        }
        message.channel.send("Name not found!")

    }
}