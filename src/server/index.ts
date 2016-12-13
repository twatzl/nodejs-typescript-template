import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import express = require('express');
import {Request, Response} from 'express';
import {text, ParsedAsUrlencoded} from 'body-parser';

const app = express();
const port = 8080;

app.use('/', express.static(__dirname + "/../client/view/html"));
app.use('/css', express.static(__dirname + "/../client/view/css"));
app.use('/app', express.static(__dirname + "/../client/app"));
app.use('/config', express.static(__dirname + "/../client/config"));
app.use('/node_modules', express.static(__dirname + "/../client/node_modules"));

// Example for Get handler
/* app.get('/', function(req: Request, res: Response) {
	res.sendFile(path.join(__dirname + "/../view/html/index.html"));
}) */

// Example for Post handler
/* app.post('/login', function (req: Request & ParsedAsUrlencoded, res: Response) {
}) */

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);
console.log('__dirname: ' + __dirname);
console.log('__filename: ' + __filename);

