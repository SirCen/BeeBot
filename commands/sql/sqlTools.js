const Sequelize = require('sequelize');

module.exports = class sqlTools {
    constructor() {
        //Connects to database file
        const sequelize  = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            storage: './database.sqlite',
            host: 'localhost',
            logging: false,
        });
        //Tests connection
        try {
            await sequelize.authenticate();
            console.log('Connection established');
        } catch (err) {
            console.error('Unable to connect: ', err);
        }
        //Creates table for guilds, columns: guildID, WhoAt, Who, Date
        this.guilds = sequelize.define('guilds', {
            guildID: {
                type: Sequelize.STRING,
                unique: true,
            },
            WhoAt: {
                type: Sequelize.STRING,
                unique: true,
            },
            Who: {
                type: Sequelize.STRING,
            },
            Date: {
                type: Sequelize.STRING,
            }
        });
    }
}