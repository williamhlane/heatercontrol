#!/home/william/.nvm/versions/node/v16.13.0/bin/node
import fetch from 'node-fetch';
import { exec } from 'child_process';
const url = 'http://192.168.0.180:3001';
const roomId = 1;
"use strict";
////WRITE TO LOG
const writeToLog = (what) => {
	exec(`echo '${Date(0)} ${what}' >> ./log`, (error, stdout, stderr) => {
		if (error) {
			console.log(error);
		} else if (stdout) {
			console.log(stdout);
		} else {
			console.log(stderr);
		}
	});
	process.exit();
}
//send with fetch
const sendTemp = (temp) => {
	const body = `{ "id" : ${parseInt(roomId)}, "currentTemp" : "${parseInt(temp)}", "token" : "999999999", "timePassedToSrv" : "${Date()}" }`;
	fetch(`${url}/updatetemp`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: body,
	}).then((res) => {
		res.json()
	}).then((res) => {
		writeToLog(`${res.results}`);
	}).catch((error) => {
		writeToLog(`${error}`);
	})

}
	exec(`sudo gettemp -f`, (error, stdout, stderr) => {
		if (error) {
			writeToLog(error);
		} else if (stdout) {
			sendTemp(stdout);
		} else {
			writeToLog(stderr);
		}
	});

