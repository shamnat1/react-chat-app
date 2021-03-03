
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const https = require("https")
require('dotenv').config();
const program = async () => {
    const connection = mysql.createConnection({
        host: process.env.HOST ||"127.0.0.1",
        user: process.env.USERNAME ||"root",
        password:  process.env.PASSWORD ||"root",
        port: process.env.DB_PORT || '8889',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });
    
    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    });

    instance.start()
        .then(() => console.log('I\'m running!'))
        .catch(err => console.error('Something bad happened', err));
   

    instance.addTrigger({
        name: 'nu3',
        expression: 'nu3.*',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => { // You will receive the events here
            event && event.affectedRows && event.affectedRows.map(row => {
                callWebHook(row.after)
            })
        },
    });


    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);

const callWebHook = () => {
    const data = JSON.stringify({
        "mock_data": "true",
        "ip_address": "92.188.61.181",
        "email": "user@example.com",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.100 Safari/534.30",
        "url": "http://example.com/"
    })

    const options = {
        hostname: "ensnxuqrmzomeey.m.pipedream.net",
        port: 443,
        path: "/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
        },
    }


    const req = https.request(options)
    req.write(data)
    req.end()
}