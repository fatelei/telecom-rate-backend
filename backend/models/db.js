'use strict';

const mysql = require('mysql')

const pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'telecom'
});

module.export = pool
