//Create database so you can !add birthday
const { birthdays } = require('../birthdays.json');
module.exports = {
    name: 'birthdays',
    length: 0,
    description: 'List all of the Birthdays inserted!',
	usage: '[command name]',
	execute(message, args) {
        return message.channel.send(birthdays);
        
	},
};