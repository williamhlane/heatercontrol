# heatercontrol
This project is a system that is designed to control a heater in a house. It is written in Javasctipt using Node, Express,React and Mysql.
A computer that is labeled TempUpdater updates the temperature regularly using a Node JS script that runs a command, the command returns the temperature
of the room using a USB Thermostat. Another computer controls a HVAC relay that controls the heater, it regularly asks using a Node JS script what is should be 
doing. The backend responced to these and updates the database, does the comparision between the desired temperature and the current one, it also interfaces with the 
React UI that allows the user to change conrtol rooms, set temperature etc.
The designer is William Harrison Lane III of harrisonswd.com.
The project videos on how it was created and how to install the system starts with this video https://youtu.be/qqlC_-mV4ME
