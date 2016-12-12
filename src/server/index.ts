import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import express = require('express');
import {Request, Response} from 'express';
import {text, ParsedAsUrlencoded} from 'body-parser';

const app = express();
const port = 8080;

app.use(express.static(__dirname + "/../view"));

app.get('/', function(req: Request, res: Response) {
	res.sendFile(path.join(__dirname + "/../view/html/index.html"));
})

app.get('/login', function (req: Request & ParsedAsUrlencoded, res: Response) {
	var loginSuccessful = req.body.successful;
	
	if (loginSuccessful) {
		res.redirect('redirect');
	} else {
		res.status(200).end();
	}
})

app.get('/api/data', function (req: Request, res: Response) {
	res.status(200).sendFile(path.join(__dirname, "../html/api.html"));
});

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);
console.log('__dirname: ' + __dirname);
console.log('__filename: ' + __filename);

