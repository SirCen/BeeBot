const Discord = require('discord.js');

module.exports = {
    name: 'probability',
    length: 0,
    description: 'Find the odds of discontent!',
	usage: '[command name]',
	execute(message, args) {      
        randomNumber = Math.floor(Math.random()*100);
        if(randomNumber == 100){
            return message.channel.send("There is DEFINIETLY a chance!")
                    .catch(console.error);
        }
        else if (randomNumber == 0){
            return message.channel.send("There is a fucking 0% chance!")
            .catch(console.error);
        }
        else{  
            return message.channel.send("There is a " + randomNumber + "% chance!")
                .catch(console.error);
        } 
	},
};
