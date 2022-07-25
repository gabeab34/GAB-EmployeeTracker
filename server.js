import mysql from 'mysql'

const connect = mysql.createConnection({
    host: 'localhost',
    port: 3003,
    user: 'root',
    password: process.env.password,
    database: 'employeeDB',
})

