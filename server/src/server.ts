import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host:"localhost",
//   port: "3306",
//   user: "root",
//   password: "",
//   database: "menagerie"
// });
// connection.connect(function(err: any) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const app = express();
app.use(cors());
//Para permitir o uso somente do meusite.com.br
// app.use(cors({origin: 'www.meusite.com.br'}));
app.use(express.json());
app.use(routes);

app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))

app.listen(3333);