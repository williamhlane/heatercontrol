#!/home/william/.nvm/versions/node/v16.13.0/bin/node
import fetch from 'node-fetch';
import { exec } from 'child_process';
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
	process.exit();//PROCESS>EXIT NEEDED TO BE ON THE OUTSIDE
}
//send with fetch
const sendTemp = (temp) => {
	const body = `{ "roomName" : "bedroom", "currentTemp" : "${parseInt(temp)}", "token" : "999999999", "timePassedToSrv" : "${Date()}" }`;
	fetch(`http://192.168.0.180:3000/updatetemp`, {
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
setTimeout(() => {
	exec(`sudo gettemp -f`, (error, stdout, stderr) => {
		if (error) {
			writeToLog(error);
		} else if (stdout) {
			sendTemp(stdout);
		} else {
			writeToLog(stderr);
		}
	});
}, 10000);
