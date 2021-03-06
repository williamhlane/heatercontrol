#!/home/pi/.nvm/versions/node/v16.13.0/bin/node
import fetch from 'node-fetch';
import { exec } from 'child_process';
const url = 'http://192.168.0.180:3001';
const unitId = 1;
const pinNumber = '4';
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
const onoff = (onoff) => {
	let onoff2;
	if(parseInt(onoff) === 1){
		onoff2 = "on";
	} else {
		onoff2 = "off";
	}
	exec(`/usr/sbin/pinset ${onoff2} ${pinNumber}`, (error, stdout, stderr) => {
		if (error) {
			writeToLog(error);
		} else if (stdout) {
			writeToLog(stdout);
		} else {
			writeToLog(stderr);
		}
	});
}
	const body = `{ "unitId" : ${parseInt(unitId)}, "token" : 999999999 }`;
	fetch(`${url}/unitinstructions`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: body,
	}).then((res) => {
		return res.json()
	}).then((res) => {
		onoff(`${res.results}`);
	}).catch((error) => {
		onoff(0);
		writeToLog(`${error}`);
	});
