#!/home/william/.nvm/versions/node/v16.13.0/bin/node
import fetch from 'node-fetch';
import { exec } from 'child_process';
"use strict";
////WRITE TO LOG
const writeToLog = (what) => {
	exec(`echo '${Date(0)} ${what}' >> ./log`, (error, stdout, stderr) => {
		if (error) {
			console.warn(error);
		} else if (stdout) {
			console.log(stdout);
		} else {
			console.log(stderr);
		}
		process.exit();
	});
}
//send with fetch
const sendTemp = (temp) => {
	writeToLog(`The temp is ${temp}.`);
}
setTimeout(() => {
	exec(`sudo gettemp -f`, (error, stdout, stderr) => {
	if(error) {
		writeToLog(error);
	} else if(stdout) {
		sendTemp(stdout);
	} else {
		writeToLog(stderr);
	}
});
}, 10000);


