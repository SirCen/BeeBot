
var moment = require('moment-timezone');
module.exports = {
    name: 'convert',
    description: 'Add a birthday to the database!',
    length: 3,
    args: true,
    usage: '<From> <To> <HHMM>',
    execute(message, args, result, connection) {
     
        var timezonein = args[0];
        var timezonewant = args[1];
        var time = args[2];
        message.channel.send(moment().tz("PST").format("MMMM Do YYYY, h:mm:ss"));




    },
};