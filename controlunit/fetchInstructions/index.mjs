#!/home/pi/.nvm/versions/node/v16.13.0/bin/node
import fetch from 'node-fetch';
import { exec } from 'child_process';
const url = 'http://192.168.0.180:3001';
const myId = '1';
const pinNuber = '4'; 
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
const onoff = (onoff,pinNumber) => {
	exec(`pinset ${onoff} ${pinNumber}`, (error, stdout, stderr) => {
		if (error) {
			writeToLog(error);
		} else if (stdout) {
			writeToLog(stdout);
		} else {
			writeToLog(stderr);
		}
	});
}
const fetchInstructions = () => {
	const body = `{ "unitId" : "${myId}", "token" : "999999999", "timePassedToSrv" : "${Date()}" }`;
	fetch(`${url}/unitinstructions`, {
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
		onoff(`${res.onoff}`, `${pinNuber}`);
	}).catch((error) => {
		writeToLog(`${error}`);
	})

}
setTimeout(() => { fetchInstructions(); }, 10000);
