#!/home/pi/.nvm/versions/node/v16.13.0/bin/node
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
	process.exit();
}
const onoff = (onoff) => {//I put onoff above fecthInstructions
	exec(`pinset ${onoff} 4`, (error, stdout, stderr) => {
		if (error) {
			writeToLog(error);
		} else if (stdout) {
			writeToLog(stdout);
		} else {
			writeToLog(stderr);
		}
	});
}
//send with fetch
const fetchInstructions = (temp) => {
	const body = `{ "roomName" : "bedroom", "currentTemp" : "${parseInt(temp)}", "token" : "999999999", "timePassedToSrv" : "${Date()}" }`;//Change body to get instructions
	fetch(`http://192.168.0.180:3000/updatetemp`, {//change url
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
		onoff(`${res.onoff}`);
	}).catch((error) => {
		writeToLog(`${error}`);
	})

}

setTimeout(() => { fetchInstructions(); }, 10000);
