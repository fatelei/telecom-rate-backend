'use strict';

const mysql = require('mysql')

export pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'telecom'
});
