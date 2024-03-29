/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Used to configure and connect with Mongodb database 
 */

let mongoose = require('mongoose');
const chalk = require('chalk');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(process.env.DB_CONFIG_MONGODB, { useUnifiedTopology: true, useNewUrlParser: true})
                .then(() => {
                    console.log(chalk.green(`[${process.env.APP_NAME}] Database connection successful`));
                })
                .catch(err => {
                    console.error(chalk.red(`[${process.env.APP_NAME}] Database connection error, please check database server up`));
                });
    }
}

module.exports = new Database();