import mysql from "mysql2";
import 'dotenv/config';

const dbconnect = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PW,
        database: process.env.MYSQL_DB
    },
    console.log('You have successfully connected to the employee database')
);

export default dbconnect