const fetch = require('node-fetch')

module.exports = {
    name: 'fetch',
    length: 0,
    description: 'Test',
	usage: '[command name]',
	execute(message, args) {   
        
        var responses;

        fetch('http://localhost:3000/employees')
            .then(response => response.json())
            .then(data => 
                 message.channel.send(data[0].first_name)
                
                );

	},
};
