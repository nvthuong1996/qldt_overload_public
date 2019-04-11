const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  user: "root",
  password: "root",
  database: "qldtoverload"
});

connection.connect((err) => {
  if (err) throw err
});

connection.query(`CREATE TABLE \`dkmh\` (
  \`mssv\` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  \`maDK\` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  \`maMH\` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (\`maDK\`,\`mssv\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`,(error)=>{});

connection.query(`CREATE TABLE \`lichdk\` (
  \`dkLoc\` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  \`value\` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (\`dkLoc\`),
  UNIQUE KEY \`dkLoc_UNIQUE\` (\`dkLoc\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`,(error)=>{});


module.exports = connection;
